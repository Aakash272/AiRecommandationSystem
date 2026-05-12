import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getActivities } from "../services/api";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PoolIcon from "@mui/icons-material/Pool";
import PedalBikeIcon from "@mui/icons-material/PedalBike";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";

// Helper to get icon based on activity type
const getActivityIcon = (type) => {
  switch (type) {
    case "RUNNING":
      return <DirectionsRunIcon />;
    case "CYCLING":
      return <PedalBikeIcon />;
    case "SWIMMING":
      return <PoolIcon />;
    case "YOGA":
    case "STRETCHING":
      return <SelfImprovementIcon />;
    default:
      return <FitnessCenterIcon />;
  }
};

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  const fetchActivities = async () => {
    try {
      const response = await getActivities();
      setActivities(response.data);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: "bold" }}>
        Recent Activities
      </Typography>
      <Grid container spacing={3}>
        {activities.map((activity) => (
          <Grid item xs={12} sm={6} md={4} key={activity.id}>
            <Card
              elevation={2}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
                "&:hover": {
                  boxShadow: 6,
                  transform: "translateY(-4px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <CardActionArea
                onClick={() => navigate(`/activities/${activity.id}`)}
                sx={{ height: "100%", p: 1 }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Chip
                      icon={getActivityIcon(activity.type)}
                      label={activity.type}
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                    <Typography variant="caption" color="text.secondary">
                      {new Date(activity.createdAt || Date.now()).toLocaleDateString()}
                    </Typography>
                  </Box>

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                       <Typography variant="body2" color="text.secondary">
                        Duration
                      </Typography>
                      <Typography variant="h6">
                        {activity.duration} <Typography component="span" variant="caption">min</Typography>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                       <Typography variant="body2" color="text.secondary">
                        Calories
                      </Typography>
                      <Typography variant="h6">
                        {activity.caloriesBurned} <Typography component="span" variant="caption">kcal</Typography>
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ActivityList;
