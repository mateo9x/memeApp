create table users
(
    id            bigint       not null,
    first_name         varchar(100) not null,
    last_name         varchar(100) not null,
    username         varchar(100) not null,
    email         varchar(100) not null,
    password      varchar(100) not null,
    reset_token   varchar(100) null,
    photo_url     varchar(255) null,
    CONSTRAINT users_pk PRIMARY KEY (id)
);

insert into users (id, first_name, last_name, username, email, password, photo_url)
    values (1, 'admin', 'admin', 'admin', 'admin@admin.com', '$2a$10$.WOAo0ZJnJth6oiTkrYh.eGqEexkR77182Ck.99wZKKPMxbZBhhe6', null),
           (2, 'mateusz', 'xxx', 'matpala', 'mail@mail.com', '$2a$10$.WOAo0ZJnJth6oiTkrYh.eGqEexkR77182Ck.99wZKKPMxbZBhhe6' , 'profile/2/avatar.png');
