import { BookingStatus } from "@/enums/bookingStatusEnum";

export const getBookingStatusTextColor = (status: BookingStatus) => {
  switch (status) {
    case BookingStatus.PENDING:
      return "text-[#6106ff] ";
    case BookingStatus.CONFIRMED:
      return "text-green-500/90 ";
    case BookingStatus.CANCELLED:
      return "text-red-500/90 ";
    case BookingStatus.REJECTED:
      return "text-red-500/90 ";
    case BookingStatus.CHECKED_IN:
      return "text-accent-500/90 ";
    case BookingStatus.CHECKED_OUT:
      return "text-slate-500/90";
    default:
      return "text-gray-500/90 ";
  }
};

export const getBookingStatusBgColor = (status: BookingStatus) => {
  switch (status) {
    case BookingStatus.PENDING:
      return "bg-yellow-400/90 hover:bg-[#6106ff";
    case BookingStatus.CONFIRMED:
      return "bg-green-400/90 hover:bg-green-400";
    case BookingStatus.CANCELLED:
      return "bg-red-400/90 hover:bg-red-400";
    case BookingStatus.REJECTED:
      return "bg-red-500/90 hover:bg-red-500";
    case BookingStatus.CHECKED_IN:
      return "bg-accent-400/90 hover:bg-accent-400";
    case BookingStatus.CHECKED_OUT:
      return "bg-slate-300/90 hover:bg-slate-300";
    default:
      return "bg-gray-400/90 hover:bg-gray-400";
  }
};

export const getBookingStausBtnColor = (status: BookingStatus) => {
  switch (status) {
    case BookingStatus.PENDING:
      return "slate-800";
    case BookingStatus.CONFIRMED:
      return "green-400";
    case BookingStatus.CANCELLED:
      return "red-400";
    case BookingStatus.REJECTED:
      return "red-500";
    case BookingStatus.CHECKED_IN:
      return "accent-400";
    case BookingStatus.CHECKED_OUT:
      return "slate-500";
    default:
      return "gray-400";
  }
};
