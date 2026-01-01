import React from "react";
import {
  Droplets,
  Wind,
  Plus,
  Edit,
  Tag,
  Percent,
  Clock,
  CheckCircle,
  TrendingUp,
  Package,
  ShoppingBag,
  X,
  Zap,
  Thermometer,
  Sparkles,
  RefreshCw,
  Star,
  Truck,
  Trash,
} from "lucide-react";
import type { ServiceCategory, ServiceStatus } from "./types";

export const dateConvert = (date?: string) => {
  if (!date) return "";
  const dateObj = new Date(date);

  const formattedDate = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formattedDate;
};

export const statusColor = [
  { label: "Pending", color: "#FACC15" },
  { label: "Ready", color: "#22C55E" },
  { label: "Picked Up", color: "#3B82F6" },
  { label: "Total Orders", color: "#A855F7" },
];

export const getCategoryBadge = (category: ServiceCategory) => {
  const categoryConfig = {
    basic: {
      color: "bg-blue-100 text-blue-800",
      icon: Package,
      label: "Basic",
    },
    premium: {
      color: "bg-purple-100 text-purple-800",
      icon: Star,
      label: "Premium",
    },
    express: {
      color: "bg-yellow-100 text-yellow-800",
      icon: Zap,
      label: "Express",
    },
    discount: {
      color: "bg-green-100 text-green-800",
      icon: Percent,
      label: "Discount",
    },
    additional: {
      color: "bg-orange-100 text-orange-800",
      icon: Plus,
      label: "Additional",
    },
  };

  return (
    categoryConfig[category] || {
      color: "bg-gray-100 text-gray-800",
      icon: Package,
      label: "Unknown",
    }
  );
};

export const serviceIcons = {
  "Wash Only": Droplets,
  "Wash & Dry": Wind,
  "Wash & Iron": Wind,
  "Express Service": Zap,
  "Steam Iron": Thermometer,
  "Delicate Wash": Sparkles,
  "Bulk Discount": Percent,
  "Pickup & Delivery": Truck,
};

export const getServiceIcon = (serviceName: string) => {
  return serviceIcons[serviceName as keyof typeof serviceIcons] || Package;
};

export const getServiceStatusBadge = (status: ServiceStatus) => {
  const statusConfig = {
    active: {
      color: "bg-green-100 text-green-800",
      icon: CheckCircle,
      label: "Active",
    },
    inactive: {
      color: "bg-gray-100 text-gray-800",
      icon: X,
      label: "Inactive",
    },
    comingSoon: {
      color: "bg-blue-100 text-blue-800",
      icon: Clock,
      label: "Coming Soon",
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
