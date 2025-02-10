import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "../../components/lib/utils"
import { Button } from "../../components/ui/button"
import { Calendar } from "../../components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../components/ui/popover"

interface Props {
    date: Date
    setDate: (date: Date) => void
    minDate?: Date,
    maxDate?: Date,
    activeDates?: Date[]
}
export function DatePicker({ activeDates, minDate, maxDate, date, setDate }: Props) {

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon />
                    {date ? format(date, "PPP") : <span>Pick a date  </span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className=" bg-slate-200 w-auto p-0">

                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(day) => {
                        if (day && (!minDate || day >= minDate) && (!maxDate || day <= maxDate) && !activeDates?.filter(date => date).find(date => format(day, "PPP") === format(date, "PPP")))
                        {
                            setDate(day); // Only set the date if it’s within the valid range
                        }
                    }}
                    disabled={(day) =>
                        !!((minDate && day < minDate) || (maxDate && day > maxDate) || activeDates?.filter(date => date).find(date => format(day, "PPP") === format(date, "PPP"))) // Disable dates outside the range
                    }
                    initialFocus
                />

            </PopoverContent>
        </Popover>
    )
}
