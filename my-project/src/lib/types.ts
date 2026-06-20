import type { LucideIcon } from "lucide-react";

export type UserType = {
  _id: string;
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "admin" | "staff";
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type ServiceType = {
  _id: string;
  serviceName: string;
  description: string;
  category: ServiceCategory;
  pricePerKg: number;
  pricePerItem: number;
  unitType: string;
  processingTime: string;
  status: ServiceStatus;
  totalOrders?: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type CustomerType = {
  _id: string;
  fullName: string;
  email: string;
  contact: string;
  totalOrders?: number;
  totalSpent?: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type OrderItem = {
  _id: string;
  service: string;
  serviceName: string;
  unit: "kg" | "item";
  count: number;
  unitPrice: number;
  subtotal: number;
};

export type CustomerInfo = {
  _id: string;
  fullName: string;
  email: string;
};

export type CreatorInfo = {
  _id?: string;
  firstName: string;
  lastName: string;
  email?: string;
};

export type OrderStatus = "pending" | "in-process" | "ready" | "picked-up" | "voided";

export type OrderType = {
  _id: string;
  customer: CustomerInfo;
  createdBy?: CreatorInfo;
  items: OrderItem[];
  itemDescription: string;
  specialInstructions: string;
  orderStatus: OrderStatus;
  paymentStatus: "pending" | "paid";
  discount: number;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  voidRequest?: boolean;
  voidReason?: string;
  voidedAt?: string;
  voidedBy?: string;
  __v: number;
};

export type OrderColumnType = {
  id: OrderStatus;
  title: string;
  icon: LucideIcon;
  color: string;
  count: number;
};

export type ServiceCategory =
  | "basic"
  | "premium"
  | "express"
  | "additional";

export type ServiceStatus = "active" | "inactive" | "comingSoon";
