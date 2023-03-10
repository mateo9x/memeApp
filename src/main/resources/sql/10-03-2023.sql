create table memes
(
    id            bigint       not null,
    title         varchar(100) not null,
    photo_url         varchar(100) not null,
    date_created timestamp not null,
    date_approved timestamp null,
    user_id int not null,
    up_votes int not null,
    approved boolean null,
    tags varchar(100) null,
    CONSTRAINT memes_pk PRIMARY KEY (id),
    CONSTRAINT memes_user_fk FOREIGN KEY (user_id)
        REFERENCES users (id) ON DELETE CASCADE
);

insert into memes (id, title, photo_url, date_created, date_approved, user_id, up_votes, approved)
values (1, 'elo', '/assets/memes/1/meme1.jpg', '2023-10-01 00:00:00', '2023-10-01 00:00:00', 1, 0, true),
        (2, 'mem numer 2', '/assets/memes/1/meme2.jpg', '2023-10-02 00:00:00', '2023-10-02 00:00:00', 1, 0, true),
        (3, 'mem numer 3', '/assets/memes/2/battle.jpg', '2023-10-04 00:00:00', '2023-10-04 00:00:00', 1, 0, true),
        (4, 'mem numer 4', '/assets/memes/2/mem.jpg', '2023-10-10 00:00:00', null, 1, 0, false);
