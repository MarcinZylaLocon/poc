import {
  Avatar,
  Box,
  Card,
  Icon,
  IconButton,
  MenuItem,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import { Paragraph } from 'app/components/Typography';

const CardHeader = styled(Box)(() => ({
  display: 'flex',
  paddingLeft: '24px',
  paddingRight: '24px',
  marginBottom: '12px',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  textTransform: 'capitalize',
}));

const ProductTable = styled(Table)(() => ({
  minWidth: 400,
  whiteSpace: 'pre',
  '& small': {
    width: 50,
    height: 15,
    borderRadius: 500,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
  },
  '& td': { borderBottom: 'none' },
  '& td:first-of-type': { paddingLeft: '16px !important' },
}));

const Small = styled('small')(({ bgcolor }) => ({
  width: 50,
  height: 15,
  color: '#fff',
  padding: '2px 8px',
  borderRadius: '4px',
  overflow: 'hidden',
  background: bgcolor,
  boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
}));

const TopSellingTable = () => {
  const { palette } = useTheme();
  const bgError = palette.error.main;
  const bgPrimary = palette.primary.main;
  const bgSecondary = palette.secondary.main;

  return (
    <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
      <CardHeader>
        <Title>Najpilniejsze zgłoszenia</Title>
        <Select size="small" defaultValue="this_month">
          <MenuItem value="this_month">Dziś</MenuItem>
          <MenuItem value="last_month">Wczoraj</MenuItem>
        </Select>
      </CardHeader>

      <Box overflow="auto">
        <ProductTable>
          <TableHead>
            <TableRow>
              <TableCell sx={{ px: 3 }} colSpan={4}>
                Użytkownik
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
                Nazwa
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
                Status
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={1}>
                Akcje
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {productList.map((product, index) => (
              <TableRow key={index} hover>
                <TableCell colSpan={4} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                  <Box display="flex" alignItems="center">
                    <Avatar src={product.imgUrl} />
                    <Paragraph sx={{ m: 0, ml: 4 }}>{product.name}</Paragraph>
                  </Box>
                </TableCell>

                <TableCell align="left" colSpan={2} sx={{ px: 0, textTransform: 'capitalize' }}>
                  {product.alert}
                </TableCell>

                <TableCell sx={{ px: 0 }} align="left" colSpan={2}>
                  {product.alertstatus == 1 ? <Small bgcolor={bgPrimary}>Prawidłowo</Small> : ""}
                  {product.alertstatus == 2 ? <Small bgcolor={bgSecondary}>Uwaga</Small> : ""}
                  {product.alertstatus == 3 ? <Small bgcolor={bgError}>Zagrożenie</Small> : ""}
                </TableCell>

                <TableCell sx={{ px: 0 }} colSpan={1}>
                  <IconButton>
                    <Icon color="primary">edit</Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ProductTable>
      </Box>
    </Card>
  );
};

const productList = [
  {
    imgUrl: '/assets/images/face-1.jpg',
    name: 'Daniel Daniel',
    alert: 'Poza strefa',
    alertstatus: 2,
  },
  {
    imgUrl: '/assets/images/face-2.jpg',
    name: 'Marek Marek',
    alert: 'SOS',
    alertstatus: 3,
  },
  {
    imgUrl: '/assets/images/face-3.jpg',
    name: 'Wojtek Wojtek',
    alert: 'Poza strefa',
    alertstatus: 2,
  },
  {
    imgUrl: '/assets/images/face-4.jpg',
    name: 'Ewa Ewa',
    alert: 'Zagrożenie',
    alertstatus: 3,
  },
  {
    imgUrl: '/assets/images/face-5.jpg',
    name: 'Weronika Weronika',
    alert: 'Potwierdzenie',
    alertstatus: 1,
  },
];

export default TopSellingTable;
