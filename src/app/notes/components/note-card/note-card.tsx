import { FC, useEffect, useState } from 'react';
import { Note } from '../../model/note';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useRemoveNote, useUpdateNote } from '../../hooks';
import tinycolor from 'tinycolor2';

export const NoteCard: FC<{ note: Note }> = ({ note }) => {
  const { mutate: remove } = useRemoveNote();
  const { mutate: update } = useUpdateNote();

  const theme = useTheme();
  const backgroundColor = note.color || theme.palette.primary.light;
  const textColor = tinycolor(backgroundColor).isDark() ? 'white' : 'black';

  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setTitle(note.title);
    setText(note.text);
  }, [note]);

  return (
    <Card
      sx={{
        backgroundColor,
        color: textColor,
        '&:hover': {
          '& .actions': {
            opacity: '1 !important',
            pointerEvents: 'auto !important',
          },
        },
      }}
    >
      <CardContent>
        <Box
          sx={{
            height: '200px',
          }}
        >
          <Stack spacing={2}>
            {edit ? (
              <TextField
                value={title}
                fullWidth
                label="Title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            ) : (
              <Typography variant="h5">{title}</Typography>
            )}

            {edit ? (
              <TextField
                value={text}
                label="Note"
                fullWidth
                multiline
                rows={4}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
            ) : (
              <Box
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                <span>{text}</span>
              </Box>
            )}
          </Stack>
        </Box>
      </CardContent>
      <CardActions>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            width: '100%',
            justifyContent: 'end',
          }}
        >
          <Box
            className="actions"
            style={{
              opacity: '0',
              pointerEvents: 'none',
            }}
          >
            <IconButton
              aria-label={edit ? 'save note ' : 'edit note'}
              onClick={() => {
                if (edit) {
                  update({ ...note, title, text });
                }
                setEdit(!edit);
              }}
              color="inherit"
            >
              {edit ? <SaveIcon /> : <EditIcon />}
            </IconButton>
            <IconButton
              aria-label="choose color note"
              onClick={() => {
                update({ ...note, favorite: !note.favorite });
              }}
              color="inherit"
            >
              {note.favorite ? <StarIcon /> : <StarBorderIcon />}
            </IconButton>
            <IconButton
              aria-label="choose color note"
              onClick={() => {
                update({ ...note, color: tinycolor.random().toHexString() });
              }}
              color="inherit"
            >
              <ColorLensIcon />
            </IconButton>
            <IconButton
              aria-label="delete note"
              onClick={() => {
                remove(note.id!);
              }}
              color="inherit"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Stack>
      </CardActions>
    </Card>
  );
};
