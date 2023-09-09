import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, itemName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      itemName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

type MultipleSelectChipTypes = {
  items: [{name: string, id: number}]
  label: string;
  id: string;
  name: string;
  touched: object;
  errors: object;
};

export const MultipleSelectChip = ({
  items, 
  label,
  id,
  name,
}:MultipleSelectChipTypes) => {
  const theme = useTheme();
  const [itemName, setItemName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof itemName>) => {
    const {
      target: { value },
    } = event;
    setItemName(
      // On autofill we get a string field value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const getNameFromId = (id: string) => {
    return items.find(item => Number(id) === item.id)?.name || '';
  }

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">{label}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          multiple
          value={itemName}
          onChange={handleChange}
          input={<OutlinedInput id={id} label={label} name={name} />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={getNameFromId(value)} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {items.map((item) => (
            <MenuItem
              key={item.name}
              value={item.id}
              style={getStyles(item.name, itemName, theme)}
            >
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}