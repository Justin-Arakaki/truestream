insert into "users" (
  "username",
  "hashedPassword"
)
values (
  'donut',
  '$argon2i$v=19$m=4096,t=3,p=1$h+dKgkzn/tsCrO+6SWgu8w$MJtxjpom6Y6LleDbJ6IKRD1Rh2Jt5CLDkYLzf5pkI/U'
);

insert into "subscriptions" (
  "serviceName",
  "cost",
  "billingCycle",
  "cycleStart",
  "photoUrl",
  "userId"
)
values (
  'Netflix',
  10.99,
  'monthly',
  '2022-04-14',
  'https://cdn.watchmode.com/provider_logos/netflix_100px.png',
  0
);
