import { Box } from '@mui/material';
import { MatxProgressBar, SimpleCard } from 'app/components';
import { Small } from 'app/components/Typography';

const Campaigns = () => {
  return (
    <Box>
      <SimpleCard title="Ilość zgłoszeń">
        <Small color="text.secondary">Dziś</Small>
        <MatxProgressBar value={60} color="primary" text="Locon Watch (102k)" />
        <MatxProgressBar value={45} color="secondary" text="Locon Pet (40k)" />
        <MatxProgressBar value={90} color="error" text="Locon GPS (180k)" />

        <Small color="text.secondary" display="block" pt={4}>
          Yesterday
        </Small>
        <MatxProgressBar value={60} color="primary" text="Locon Watch (102k)" />
        <MatxProgressBar value={45} color="secondary" text="Locon Pet (40k)" />
        <MatxProgressBar value={90} color="error" text="Locon GPS (180k)" />

        <Small color="text.secondary" display="block" pt={4}>
          Przedwczoraj
        </Small>
        <MatxProgressBar value={60} color="primary" text="Locon Watch (102k)" />
        <MatxProgressBar value={45} color="secondary" text="Locon Pet (40k)" />
        <MatxProgressBar value={90} color="error" text="Locon GPS (180k)" />
      </SimpleCard>
    </Box>
  );
};

export default Campaigns;
