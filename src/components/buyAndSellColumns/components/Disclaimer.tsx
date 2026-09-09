import {Box, Typography, Paper} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function Disclaimer() {
    return (
        <Paper
            elevation={0}
            sx={{
                width: '100%',
                p: 2.5,
                mt: 2,
                backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
            }}
        >
            <Box sx={{display: 'flex', gap: 1.5, alignItems: 'flex-start'}}>
                <InfoOutlinedIcon color="action" sx={{mt: 0.3, fontSize: 20}}/>
                <Box>
                    <Typography
                        variant="caption"
                        component="p"
                        color="text.secondary"
                        sx={{fontWeight: 600, mb: 1, textTransform: 'uppercase', letterSpacing: 0.5}}
                    >
                        Disclaimer & Usage Notes
                    </Typography>

                    <Typography
                        variant="caption"
                        component="div"
                        color="text.secondary"
                        sx={{lineHeight: 1.6, '& p': {mb: 1}}}
                    >
                        <p>
                            <strong>Execution & Multi-Fill Orders:</strong> Figures are calculated based on single-order
                            assumptions. In actual trading, a single buy or sell order may be executed across multiple
                            partial fills, which can affect the final distribution of fixed per-transaction fees and
                            commissions.
                        </p>

                        <p>
                            <strong>Informational Purpose Only:</strong> This tool is provided solely for personal
                            record-keeping
                            and estimation. Results may not reflect real-time policy updates, shifting regulatory
                            levies,
                            local tax/stamp duty changes, or broker-specific fee tier adjustments.
                        </p>
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
};