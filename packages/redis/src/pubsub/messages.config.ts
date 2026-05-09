// config/messages.config.ts  ───────────────────────────────────────────────
import { Channel } from "./channels.config";

/**
 * Standard envelope wrapping every message published to any channel.
 * Consumers should always unwrap this before accessing the payload.
 */
export interface PubSubMessage<T = unknown> {
    channel:   Channel;
    payload:   T;
    timestamp: string;     // ISO-8601
    messageId: string;     // UUID v4 — for deduplication & distributed tracing
    source:    string;     // publishing service name  e.g. "user-service"
    version:   string;     // payload schema version   e.g. "1.0.0"
}

// ── Per-channel payload contracts ──────────────────────────────────────────

export interface UserCreatedPayload {
    userId:    string;
    email:     string;
    name:      string;
    createdAt: string;
}

export interface UserUpdatedPayload {
    userId:  string;
    changes: Record<string, unknown>;
}

export interface UserDeletedPayload {
    userId: string;
}

export interface UserPasswordResetPayload {
    userId: string;
    email:  string;
}

export interface OrderPlacedPayload {
    orderId: string;
    userId:  string;
    items:   { productId: string; quantity: number; price: number }[];
    total:   number;
}

export interface OrderStatusChangedPayload {
    orderId:   string;
    prevStatus: OrderStatus;
    newStatus:  OrderStatus;
}

export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";

export interface PaymentInitiatedPayload {
    paymentId: string;
    orderId:   string;
    userId:    string;
    amount:    number;
    currency:  string;
}

export interface PaymentSuccessPayload {
    paymentId:     string;
    orderId:       string;
    transactionId: string;
}

export interface PaymentFailedPayload {
    paymentId: string;
    orderId:   string;
    reason:    string;
}

export interface PaymentRefundedPayload {
    paymentId: string;
    orderId:   string;
    amount:    number;
}

export interface NotificationPayload {
    userId:  string;
    title:   string;
    body:    string;
    type:    "info" | "warning" | "error" | "success";
    link?:   string;
}

export interface CacheInvalidatePayload {
    pattern: string;     // e.g. "user:u_123:*"
}

/**
 * Channel → Payload type mapping.
 * Use this to get strict typing when publishing or subscribing.
 *
 * Example:
 *   type Payload = ChannelPayloadMap[typeof CHANNELS.USER_CREATED]
 *   // → UserCreatedPayload
 */
export interface ChannelPayloadMap {
    "user:created":          UserCreatedPayload;
    "user:updated":          UserUpdatedPayload;
    "user:deleted":          UserDeletedPayload;
    "user:password-reset":   UserPasswordResetPayload;
    "order:placed":          OrderPlacedPayload;
    "order:confirmed":       OrderPlacedPayload;
    "order:cancelled":       OrderPlacedPayload;
    "order:status-changed":  OrderStatusChangedPayload;
    "payment:initiated":     PaymentInitiatedPayload;
    "payment:success":       PaymentSuccessPayload;
    "payment:failed":        PaymentFailedPayload;
    "payment:refunded":      PaymentRefundedPayload;
    "notification:send":     NotificationPayload;
    "notification:read":     NotificationPayload;
    "cache:invalidate":      CacheInvalidatePayload;
    "cache:invalidate-all":  Record<string, never>;
}