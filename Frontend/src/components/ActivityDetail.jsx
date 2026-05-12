import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getActivity, getActivityDetail } from "../services/api";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    const fetchActivityDetail = async () => {
      try {
        const activityResponse = await getActivity(id);
        setActivity(activityResponse.data);
        console.log("Activity: ", activityResponse.data);

        // Fetch recommendations only if activity fetch corresponds
        const response = await getActivityDetail(id);
        setRecommendation(response.data);
        console.log("recommendations of the activity: ", response.data);
      } catch (error) {
        console.error("Error fetching activity detail:", error);
      }
    };

    fetchActivityDetail();
  }, [id]);

  if (!activity) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 2 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/activities")}
        sx={{ mb: 3 }}
      >
        Back to Activities
      </Button>

      <Grid container spacing={3}>
        {/* Main Activity Details */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: "100%", borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom color="primary">
              Activity Summary
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Type</Typography>
                <Chip label={activity.type} color="secondary" sx={{ mt: 1 }} />
            </Box>

            <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Duration</Typography>
                <Typography variant="h4">{activity.duration} <Typography component="span" variant="body1">min</Typography></Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Calories Burned</Typography>
                <Typography variant="h4">{activity.caloriesBurned} <Typography component="span" variant="body1">kcal</Typography></Typography>
            </Box>

             <Box>
                <Typography variant="subtitle2" color="text.secondary">Date</Typography>
                <Typography variant="body1">{new Date(activity.createdAt || Date.now()).toLocaleDateString()}</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* AI Recommendations */}
        <Grid item xs={12} md={8}>
          {recommendation ? (
            <Paper elevation={3} sx={{ p: 3, height: "100%", borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                 <TipsAndUpdatesIcon color="warning" sx={{ mr: 1 }} />
                 <Typography variant="h5" color="primary">
                    AI Analysis & Recommendations
                 </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />

              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Analysis
              </Typography>
              <Typography paragraph color="text.secondary" sx={{ fontStyle: 'italic', bgcolor: '#f5f5f5', p: 2, borderRadius: 1 }}>
                {recommendation.recommendation}
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                        <CheckCircleOutlineIcon color="success" sx={{ mr: 1, fontSize: 20 }} /> Suggested Improvements
                    </Typography>
                    <List dense>
                        {recommendation?.improvements?.map((improvement, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={improvement} />
                        </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={12} md={6}>
                     <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                        <TipsAndUpdatesIcon color="info" sx={{ mr: 1, fontSize: 20 }} /> General Suggestions
                    </Typography>
                    <List dense>
                        {recommendation?.suggestions?.map((suggestion, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={suggestion} />
                        </ListItem>
                        ))}
                    </List>
                </Grid>
              </Grid>

              <Box sx={{ mt: 3 }}>
                 <Typography variant="subtitle1" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', color: 'error.main' }}>
                    <WarningAmberIcon sx={{ mr: 1 }} /> Safety Guidelines
                </Typography>
                <List dense>
                    {recommendation?.safety?.map((safety, index) => (
                    <ListItem key={index}>
                         <ListItemText primary={safety} />
                    </ListItem>
                    ))}
                </List>
              </Box>
            </Paper>
          ) : (
             <Paper elevation={3} sx={{ p: 3, height: "100%", borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography color="text.secondary">Loading AI recommendations...</Typography>
             </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ActivityDetail;
