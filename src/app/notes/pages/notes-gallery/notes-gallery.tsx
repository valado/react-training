import AddIcon from '@mui/icons-material/Add';
import { Box, Divider, Fab, Grid } from '@mui/material';
import { FC } from 'react';
import { NoteCard } from '../../components/note-card';
import { useAddNote, useNotesQuery } from '../../hooks';

export const NotesGallery: FC = () => {
  const notes = useNotesQuery();
  const { mutate } = useAddNote();
  const noteList = Object.values(notes).filter((note) => !note.favorite);
  const favoritesNoteList = Object.values(notes).filter(
    (note) => note.favorite
  );
  return (
    <Box
      sx={{
        width: '100%',
        height: 'calc(100% - 40px)',
      }}
    >
      <Box
        sx={{
          width: 'calc(100% - 4rem)',
          height: 'calc(100% - 4rem)',
          position: 'relative',
          padding: '2rem',
          overflow: 'auto',
        }}
      >
        {favoritesNoteList.length > 0 && (
          <>
            <Grid container spacing={2}>
              {favoritesNoteList.map((note) => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={note.id}>
                  <NoteCard note={note} />
                </Grid>
              ))}
            </Grid>
            <Divider sx={{ my: '2rem' }} />
          </>
        )}

        <Grid container spacing={2}>
          {noteList.map((note) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={note.id}>
              <NoteCard note={note} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: '1.5rem',
          right: '1.5rem',
        }}
      >
        <Fab
          color="primary"
          aria-label="add note"
          onClick={() => {
            mutate({
              title: 'new note',
              text: '',
            });
          }}
        >
          <AddIcon />
        </Fab>
      </Box>
    </Box>
  );
};
