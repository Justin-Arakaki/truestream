set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

create table "public"."users" (
  "user_id" serial,
  "username" text not null,
  "hashed_password" text not null,
  "created_at" timestamptz(6) not null default now(),
  primary key ("user_id"),
  unique ("username")
);

create table "public"."subscriptions" (
  "subscription_id" serial,
  "user_id" integer not null,
  "service_id" integer not null,
  "is_active" boolean not null default true,
  "cost" float not null,
  "billing_cycle" text not null,
  "cycle_start" date not null,
  "created_at" timestamptz(6) not null default now(),
  "updated_at" timestamptz(6) not null default now(),
  primary key ("subscription_id")
);
