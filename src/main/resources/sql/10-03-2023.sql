create table memes
(
    id            bigint       not null,
    title         varchar(100) not null,
    photo_url         varchar(100) not null,
    date_created timestamp not null,
    date_approved timestamp null,
    user_id int not null,
    up_votes int not null,
    down_votes int not null,
    approved boolean null,
    tags varchar(255) null,
    CONSTRAINT memes_pk PRIMARY KEY (id),
    CONSTRAINT memes_user_fk FOREIGN KEY (user_id)
        REFERENCES users (id) ON DELETE CASCADE
);

insert into memes (id, title, photo_url, date_created, date_approved, user_id, up_votes, down_votes, approved, tags)
values (1, 'elo', 'memes/1/1_meme1.jpg', '2023-03-11 00:00:00', '2023-02-01 00:00:00', 1, 0, 0, true, 'funny,heheszky'),
        (2, 'mem numer 2', 'memes/1/2_meme2.jpg', '2023-03-10 00:00:00', '2023-02-02 00:00:00', 1, 0, 0, true, 'meme'),
        (3, 'mem numer 3', 'memes/2/3_battle.jpg', '2023-02-04 00:00:00', '2023-02-04 00:00:00', 2, 0, 0, true, 'funny'),
        (4, 'mem numer 4', 'memes/2/4_mem.jpg', '2023-02-10 00:00:00', null, 2, 0, 0, false, null),
       (5, 'Michael Jackson', 'memes/2/5_mjackson.gif', '2023-02-10 00:00:00', null, 2, 0, 0, false, null);
