insert into "users" (
  "username",
  "hashed_password"
)
values (
  'testuser',
  '$argon2i$v=19$m=4096,t=3,p=1$619Id+a+zvv7rzI0nDVslQ$t17KNxJpAEbISNR12XUofOMbeHqolP8LZSv2nXcpvL4'
);

-- username: testuser, password: password

insert into "subscriptions" (
  "user_id",
  "service_id",
  "is_active",
  "cost",
  "billing_cycle",
  "cycle_start"
)
values (
  1,
  203,
  true,
  10.99,
  'monthly',
  '2022-04-14'
);

insert into "subscriptions" (
  "user_id",
  "service_id",
  "is_active",
  "cost",
  "billing_cycle",
  "cycle_start"
)
values (
  1,
  157,
  false,
  13.99,
  'monthly',
  '2022-04-14'
);
