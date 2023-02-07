import { memo, useState, FC, SyntheticEvent } from 'react';
import {
  Grid, Rating, Typography,
} from '@mui/material';
import { Post } from 'src/models/post';

import style from './PostCard.module.css';

interface Props {

  /** Post. */
  readonly post: Post;
}

const PostCardComponent: FC<Props> = ({
  post,
}) => {
  const [value, setValue] = useState(3);

  const handleChangeRating = (_event: SyntheticEvent<Element, Event>, newValue: number | null) => {
    setValue(newValue ?? 0);
  };

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={8}>
          <h3>{post.title}</h3>
        </Grid>
        <Grid item xs={4} display="flex" justifyContent="flex-end">
          <Rating
            value={value}
            onChange={handleChangeRating}
            classes={{
              iconFilled: style.icon,
            }}
          />
        </Grid>
      </Grid>
      <Typography variant="body1" gutterBottom>
        {post.body}
      </Typography>
      <hr className={style.divider} />
    </>
  );
};

export const PostCard = memo(PostCardComponent);
