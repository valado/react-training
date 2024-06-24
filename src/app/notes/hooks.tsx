import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { Note } from './model/note';
import { environment } from 'src/environments/environment';
import { getToken } from '../auth/auth-utils';

const ITEMS_QUERY_KEY = 'notes';
const queryKey = [ITEMS_QUERY_KEY];
const getAuthHeader = () => {
  const token = getToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
};
const invalidateQueryCache = (queryClient: QueryClient) =>
  queryClient.invalidateQueries({ queryKey });

type NotesReponse = { [id: string]: Note };

const fetchNotes = () =>
  fetch(`${environment.API_URL}/notes`, getAuthHeader()).then((res) =>
    res.json()
  );

const addNote = (note: Note) =>
  fetch(`${environment.API_URL}/notes`, {
    method: 'PUT',
    body: JSON.stringify({ note }),
    ...getAuthHeader(),
  }).then((res) => res.json());

const removeNote = (id: string) =>
  fetch(`${environment.API_URL}/notes/${id}`, {
    method: 'DELETE',
    ...getAuthHeader(),
  });

const updateNote = (note: Note) =>
  fetch(`${environment.API_URL}/notes/${note.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ note }),
    ...getAuthHeader(),
  });

export const useNotesQuery = (): NotesReponse => {
  const response = useQuery({
    queryKey,
    queryFn: fetchNotes,
  });
  return response.data?.notes || {};
};

export const useAddNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addNote,
    onSuccess: () => invalidateQueryCache(queryClient),
  });
};

export const useRemoveNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeNote,
    onSuccess: () => invalidateQueryCache(queryClient),
  });
};

export const useUpdateNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateNote,
    onSuccess: () => invalidateQueryCache(queryClient),
  });
};
