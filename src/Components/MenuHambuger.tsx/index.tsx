import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import HomeIcon from '@mui/icons-material/Home';
import CalculateIcon from '@mui/icons-material/Calculate';
import VisitorsIcon from '@mui/icons-material/Group';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import BackupTableIcon from '@mui/icons-material/BackupTable';
type Anchor = 'left';
export default function MenuHamburger(props: { onTextoDoMenuChange: (texto: string) => void }) {
  const handleTextMenu = (textoDoMenu: string) => {
    props.onTextoDoMenuChange(textoDoMenu);
  }
  const [state, setState] = React.useState({
    left: false,
  });
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }
        setState({ ...state, [anchor]: open });
      };
  const list = (anchor: Anchor) => (
    <Box
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Home", "Contador", "Visitantes","Formulario","Tabela"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleTextMenu(text)}>
              <ListItemIcon>
                {index === 0 ? <HomeIcon /> : index === 1 ? <CalculateIcon /> : index === 2 ? <VisitorsIcon /> : index === 3 ? <LibraryBooksIcon /> : index === 4 ? <BackupTableIcon /> : null}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <div>
      {(['left'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button className='menuHamburgerBotao' onClick={toggleDrawer(anchor, true)}>
            <MenuOpenIcon className='menuHamburgerIcon' titleAccess='MENU' />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}