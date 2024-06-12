"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { eventFormSchema } from "@/lib/validator"
import * as z from 'zod'
import { eventDefaultValues } from "@/constants"
import Dropdown from "./Dropdown"
import { Textarea } from "@/components/ui/textarea"
import { FileUploader } from "./FileUploader"
import { useState } from "react"
import DatePicker from "react-datepicker";
import { useUploadThing } from '@/lib/uploadthing'
import { Checkbox } from "../ui/checkbox"
import { useRouter } from "next/navigation"
import { createEvent, updateEvent } from "@/lib/actions/event.actions"
import { IEvent } from "@/lib/database/models/event.model"

import "react-datepicker/dist/react-datepicker.css";

type EventFormProps = {
    userId: string;
    type: "Создать" | "Обновить";
    event?: IEvent;
    eventId?: string;
}

const EventForm = ({ userId, type, event, eventId }: EventFormProps) => {
    const [files, setFiles] = useState<File[]>([]);
    const initialValues = event && type === 'Обновить'
        ? {
            ...event,
            startDateTime: new Date(event.startDateTime),
            endDateTime: new Date(event.endDateTime)
        }
        : eventDefaultValues;
    const router = useRouter();
    const { startUpload } = useUploadThing('imageUploader');
    const form = useForm<z.infer<typeof eventFormSchema>>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: initialValues
    });

    async function onSubmit(values: z.infer<typeof eventFormSchema>) {
        let uploadedImageUrl = values.imageUrl;

        if (files.length > 0) {
            const uploadedImages = await startUpload(files);

            if (!uploadedImages) {
                console.error("Image upload failed");
                return;
            }

            uploadedImageUrl = uploadedImages[0].url;
        }

        try {
            if (type === 'Создать') {
                const newEvent = await createEvent({
                    event: { ...values, imageUrl: uploadedImageUrl },
                    userId,
                    path: '/profile'
                });

                if (newEvent) {
                    form.reset();
                    router.push(`/events/${newEvent._id}`);
                }
            } else if (type === 'Обновить') {
                if (!eventId) {
                    router.back();
                    return;
                }

                const updatedEvent = await updateEvent({
                    userId,
                    event: { ...values, imageUrl: uploadedImageUrl, _id: eventId },
                    path: `/events/${eventId}`
                });

                if (updatedEvent) {
                    form.reset();
                    router.push(`/events/${updatedEvent._id}`);
                }
            }
        } catch (error) {
            console.error("Error creating or updating event:", error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input placeholder="Название мероприятия" {...field} className="input-field" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Dropdown onChangeHandler={field.onChange} value={field.value} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl className="h-72">
                                    <Textarea placeholder="Описание" {...field} className="textarea rounded-2xl" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl className="h-72">
                                    <FileUploader
                                        onFieldChange={field.onChange}
                                        imageUrl={field.value}
                                        setFiles={setFiles}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                                        <Image
                                            src="/assets/icons/location-grey.svg"
                                            alt="calendar"
                                            width={24}
                                            height={24}
                                        />
                                        <Input placeholder="Место проведения мероприятия или Онлайн" {...field} className="input-field" />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="startDateTime"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                                        <Image
                                            src="/assets/icons/calendar.svg"
                                            alt="calendar"
                                            width={24}
                                            height={24}
                                            className="filter-grey"
                                        />
                                        <p className="ml-3 whitespace-nowrap text-grey-600">Начало мероприятия:</p>
                                        <DatePicker
                                            selected={field.value}
                                            onChange={(date: Date) => field.onChange(date)}
                                            showTimeSelect
                                            timeInputLabel="Time:"
                                            dateFormat="dd.MM.yyyy h:mm aa"
                                            wrapperClassName="datePicker"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="endDateTime"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                                        <Image
                                            src="/assets/icons/calendar.svg"
                                            alt="calendar"
                                            width={24}
                                            height={24}
                                            className="filter-grey"
                                        />
                                        <p className="ml-3 whitespace-nowrap text-grey-600">Окончание мероприятия:</p>
                                        <DatePicker
                                            selected={field.value}
                                            onChange={(date: Date) => field.onChange(date)}
                                            showTimeSelect
                                            timeInputLabel="Time:"
                                            dateFormat="dd.MM.yyyy h:mm aa"
                                            wrapperClassName="datePicker"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                                        <Image
                                            src="/assets/icons/ticket.svg"
                                            alt="calendar"
                                            width={24}
                                            height={24}
                                            className="filter-grey"
                                        />
                                        <Input placeholder="Цена" {...field} className="input-field" />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="capacity"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                                        <Image
                                            src="/assets/icons/users.svg"
                                            alt="calendar"
                                            width={24}
                                            height={24}
                                            className="filter-grey"
                                        />
                                        <Input placeholder="Количество мест" {...field} className="input-field" />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="isFree"
                        render={({ field }) => (
                            <FormItem className="w-full flex flex-row items-center">
                                <FormControl>
                                    <Checkbox {...field} checked={field.value} />
                                </FormControl>
                                <label className="ml-2 text-sm">Бесплатное мероприятие</label>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex justify-end">
                    <Button type="submit" className="btn-primary">
                        {type === "Создать" ? "Создать" : "Обновить"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default EventForm;