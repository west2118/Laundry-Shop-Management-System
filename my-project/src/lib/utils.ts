import axios from "axios";
import type { OrderStatus } from "./types";
import {
  CheckCircle,
  Clock,
  Package,
  RefreshCw,
  Truck,
  XCircle,
  type LucideIcon,
} from "lucide-react";

export const fetchData =
  (url: string, token: string | null, withParams = false) =>
  async ({ queryKey }: { queryKey: any }) => {
    const [_key, param] = queryKey;
    const finalUrl = withParams ? `${url}/${param}` : url;

    const res = await axios.get(finalUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  };

export const getStatusBadge = (status: OrderStatus) => {
  const statusConfig = {
    pending: {
      color: "bg-yellow-100 text-yellow-800",
      icon: Clock,
      label: "Pending",
    },
    "in-process": {
      color: "bg-blue-100 text-blue-800",
      icon: RefreshCw,
      label: "In Process",
    },
    ready: {
      color: "bg-green-100 text-green-800",
      icon: CheckCircle,
      label: "Ready",
    },
    "picked-up": {
      color: "bg-purple-100 text-purple-800",
      icon: Truck,
      label: "Picked Up",
    },
  };

  return (
    statusConfig[status] || {
      color: "bg-gray-100 text-gray-800",
      icon: Package,
      label: "Unknown",
    }
  );
};

export const getServiceBadge = (service: string) => {
  const serviceConfig: Record<string, { color: string; label: string }> = {
    "Wash Only": {
      color: "bg-blue-50 text-blue-700 border-blue-200",
      label: "Wash Only",
    },
    "Dry Clean": {
      color: "bg-green-50 text-green-700 border-green-200",
      label: "Dry Clean",
    },
    "Wash & Dry": {
      color: "bg-purple-50 text-purple-700 border-purple-200",
      label: "Wash & Dry",
    },
    Premium: {
      color: "bg-orange-50 text-orange-700 border-orange-200",
      label: "Premium",
    },
  };

  return (
    serviceConfig[service] || {
      color: "bg-gray-50 text-gray-700 border-gray-200",
      label: service,
    }
  );
};
export const getPaymentStatusBadge = (status: string) => {
  const statusConfig: Record<
    string,
    { color: string; icon: LucideIcon; label: string }
  > = {
    pending: {
      color: "bg-yellow-100 text-yellow-800",
      icon: Clock,
      label: "Pending",
    },
    paid: {
      color: "bg-green-100 text-green-800",
      icon: CheckCircle,
      label: "Paid",
    },
    cancelled: {
      color: "bg-red-100 text-red-800",
      icon: XCircle,
      label: "Cancelled",
    },
  };

  return (
    statusConfig[status] || {
      color: "bg-gray-100 text-gray-800",
      icon: Package,
      label: "Unknown",
    }
  );
};

export const serviceColor = [
  {
    name: "Wash Only",
    color: "#3B82F6",
  },
  {
    name: "Dry Clean",
    color: "#22C55E",
  },
  {
    name: "Wash & Dry",
    color: "#A855F7",
  },
  {
    name: "Premium",
    color: "#F97316",
  },
];

export const pesoFormatter = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  minimumFractionDigits: 2,
});
