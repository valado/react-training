import { FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';

import { useComponentsTranslation, useEnumsTranslation } from 'src/app/i18n';
import {
  add,
  fetchIssues,
  remove,
  storeIssues,
  update,
  useIssues,
} from '../slice';
import { IssuePriority } from '../model/issue';
import { useAppDispatch } from 'src/app/redux/hooks';

export const IssuesTable: FC = () => {
  const dispatch = useAppDispatch();
  const issues = useIssues();
  const { t } = useComponentsTranslation('IssuesTable');
  const { t: enumT } = useEnumsTranslation('IssuePriority');

  useEffect(() => {
    dispatch(fetchIssues());
  }, [dispatch]);

  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    dispatch(remove(id as string));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    dispatch(update(updatedRow as any));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: t('header.id'),
      type: 'string',
      sortable: false,
      width: 50,
    },
    {
      field: 'title',
      headerName: t('header.title'),
      type: 'string',
      sortable: false,
      editable: true,
      width: 200,
    },
    {
      field: 'description',
      headerName: t('header.description'),
      type: 'string',
      sortable: false,
      editable: true,
      width: 250,
    },
    {
      field: 'completed',
      headerName: t('header.completed'),
      type: 'boolean',
      editable: true,
      width: 50,
    },
    {
      field: 'priority',
      headerName: t('header.priority'),
      type: 'singleSelect',
      valueFormatter: (params) => enumT(params.value),
      editable: true,
      valueOptions: Object.values(IssuePriority),
      width: 200,
    },
    {
      field: 'openedOn',
      headerName: t('header.openedOn'),
      type: 'date',
      valueFormatter: (params) => new Date(params.value).toUTCString(),
      width: 150,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={issues}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
      />
    </Box>
  );
};

const EditToolbar = () => {
  const dispatch = useAppDispatch();

  return (
    <GridToolbarContainer>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => {
          dispatch(add());
        }}
      >
        Add Issue
      </Button>
      <Button
        variant="contained"
        startIcon={<SaveIcon />}
        onClick={() => {
          dispatch(storeIssues());
        }}
      >
        Save
      </Button>
    </GridToolbarContainer>
  );
};
