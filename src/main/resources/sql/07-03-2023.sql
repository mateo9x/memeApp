create table users
(
    id            bigint       not null,
    username         varchar(100) not null,
    email         varchar(100) not null,
    password      varchar(100) not null,
    reset_token   varchar(100) null,
    CONSTRAINT users_pk PRIMARY KEY (id)
);

insert into users (id, username, email, password)
    values (1, 'admin', 'admin@admin.com', '$2a$10$.WOAo0ZJnJth6oiTkrYh.eGqEexkR77182Ck.99wZKKPMxbZBhhe6'),
           (2, 'mtpala', 'mail@mail.com', '$2a$10$.WOAo0ZJnJth6oiTkrYh.eGqEexkR77182Ck.99wZKKPMxbZBhhe6');
