"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Input } from "./ui/input";

const FormSchema = z.object({
  session_type: z.enum(["counselling", "therapy"], {
    required_error: "You need to select a session type.",
  }),
  session_mode: z.enum(["in-person", "online"], {
    required_error: "You need to select a session mode",
  }),
  session_date: z.date({
    required_error: "A Session Date is required.",
  }),
  session_time: z
    .string({
      required_error: "Session time is required.",
    })
    .regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, {
      message: "Please enter a valid time in HH:MM format.",
    }),
  session_details: z
    .string()
    .min(10, {
      message: "Session Details must be at least 10 characters.",
    })
    .max(160, {
      message: "Session Details must not be longer than 30 characters.",
    }),
});

export default function Schedulesession() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      session_mode: "in-person",
      session_type: "counselling",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });

    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Session Type */}
        <FormField
          control={form.control}
          name="session_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Session Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-white w-[100%]">
                    <SelectValue placeholder="Counselling (1 hour)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="counselling">
                    Counselling (1 hour)
                  </SelectItem>
                  <SelectItem value="therapy">Therapy (30 mins)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Session Mode */}
        <FormField
          control={form.control}
          name="session_mode"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Session Mode</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="in-person"
                      id="in-person"
                      className="bg-white size-4 border-black"
                    />
                    <label htmlFor="in-person" className="text-sm">
                      In-Person
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="online"
                      id="online"
                      className="bg-white size-4 border-black"
                    />
                    <label htmlFor="online" className="text-sm">
                      Online
                    </label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between items-center">
          {/* Session Date */}
          <FormField
            control={form.control}
            name="session_date"
            render={({ field }) => (
              <FormItem className="flex flex-col  w-[47%]">
                <FormLabel>Session Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[100%] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Session Time */}
          <FormField
            control={form.control}
            name="session_time"
            render={({ field }) => (
              <FormItem className="flex flex-col w-[47%]">
                <FormLabel>Session Time Slot</FormLabel>
                <FormControl>
                  <Input
                    type="time"
                    value={field.value}
                    onChange={field.onChange}
                    className="bg-white pl-4 pr-10"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Session Details */}
        <FormField
          control={form.control}
          name="session_details"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Session Details (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter session details here"
                  className="resize-none w-[100%] bg-white"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Buttons */}
        <div className="flex justify-between gap-4 pt-2">
          <Button
            variant="outline"
            className="flex-1 border border-red-400 text-red-500"
            onClick={() => {
              form.reset({
                session_type: "counselling",
                session_mode: "in-person",
              });
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-gradient-to-r from-purple-300 to-pink-300 text-white"
          >
            Confirm
          </Button>
        </div>
      </form>
    </Form>
  );
}
