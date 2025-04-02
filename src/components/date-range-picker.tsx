"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerWithRangeProps {
  className?: string;
  onChange?: (range: DateRange | undefined) => void;
  initialDateRange?: DateRange;
  disabledDates?: Date[];
  showInfo?: boolean;
}

export function DatePickerWithRange({
  className,
  onChange,
  initialDateRange,
  disabledDates = [],
  showInfo,
}: DatePickerWithRangeProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(
    initialDateRange || {
      from: new Date(),
      to: new Date(new Date().setDate(new Date().getDate() + 7)),
    }
  );

  const handleSelect = (selectedRange: DateRange | undefined) => {
    setDate(selectedRange);
    if (onChange) {
      onChange(selectedRange);
    }
  };

  // Function to customize day rendering
  const modifiers = {
    booked: disabledDates,
  };

  const modifiersStyles = {
    booked: {
      backgroundColor: "#FFEBEE",
      color: "#B71C1C",
      textDecoration: "line-through",
    },
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
            disabled={(date) =>
              // Disable dates in the past
              date < new Date(new Date().setHours(0, 0, 0, 0)) ||
              // Disable booked dates
              disabledDates.some(
                (disabledDate) =>
                  disabledDate.toDateString() === date.toDateString()
              )
            }
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            className="date-range-calendar"
            components={{
              DayContent: ({ date: dayDate }) => {
                const isBooked = disabledDates.some(
                  (disabledDate) =>
                    disabledDate.toDateString() === dayDate.toDateString()
                );
                return (
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-md",
                      isBooked && "booked-date"
                    )}
                  >
                    {dayDate.getDate()}
                    {isBooked && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-500" />
                    )}
                  </div>
                );
              },
            }}
          />
          <div className={`p-3 border-t text-xs ${showInfo ? "" : " hidden"}`}>
            <div className="flex items-center mt-2">
              <div className="w-3 h-3 bg-red-100 border border-red-500 mr-2 rounded-full"></div>
              <span>Booked Dates (Unavailable)</span>
            </div>
            <div className="flex items-center mt-2">
              <div className="w-3 h-3 bg-primary/10 border border-primary mr-2 rounded-full"></div>
              <span>Selected Range</span>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
