insert into "users" (
  "username",
  "hashedPassword"
)
values (
  'testuser',
  '$argon2i$v=19$m=4096,t=3,p=1$619Id+a+zvv7rzI0nDVslQ$t17KNxJpAEbISNR12XUofOMbeHqolP8LZSv2nXcpvL4'
);

-- username: testuser, password: password

insert into "subscriptions" (
  "serviceName",
  "isActive",
  "cost",
  "billingCycle",
  "cycleStart",
  "photoUrl",
  "userId"
)
values (
  'Netflix',
  true,
  10.99,
  'monthly',
  '2022-04-14',
  'https://cdn.watchmode.com/provider_logos/netflix_100px.png',
  1
);

insert into "subscriptions" (
  "serviceName",
  "isActive",
  "cost",
  "billingCycle",
  "cycleStart",
  "photoUrl",
  "userId"
)
values (
  'Hulu',
  false,
  13.99,
  'monthly',
  '2022-04-14',
  'https://cdn.watchmode.com/provider_logos/hulu_100px.png',
  1
);
