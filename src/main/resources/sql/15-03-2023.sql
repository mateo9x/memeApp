create table meme_comments
(
    id            bigint       not null,
    comment         varchar(255) not null,
    meme_id         int not null,
    user_id         int not null,
    date_created timestamp not null,
    CONSTRAINT meme_comments_pk PRIMARY KEY (id),
    CONSTRAINT meme_comments_user_pk FOREIGN KEY (user_id)
    REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT meme_comments_meme_pk FOREIGN KEY (meme_id)
    REFERENCES memes (id) ON DELETE CASCADE
);

insert into meme_comments (id, comment, meme_id, user_id, date_created)
values (1, 'nie podoba mi się ten mem', 1, 1, '2023-02-01 00:00:00'),
       (2, 'sztosiwo', 2, 2, '2023-02-02 00:00:00');
