import Accordion from "@mui/material/Accordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import { useGetAllJobs } from "../../modules/Jobs.hooks";

export default function JobsAccordion() {
  const { data, isLoading, isError, error } = useGetAllJobs();

  if (isLoading) {
    return <p>Loading jobs...</p>;
  }

  if (isError) {
    return <p>Error fetching jobs: {error.message}</p>;
  }

  return (
    <div>
      {data.map((job, index) => (
        <Accordion
          key={index}
          className="mb-4 mt-4"
          sx={{
            border: "2px solid rgba(0,0,0,.2)",
            boxShadow: "none",
            backgroundColor: "rgb(239, 243, 246)",
            borderRadius: "8px",
            "&:first-of-type": {
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
            },
            "&:last-of-type": {
              borderBottomLeftRadius: "8px",
              borderBottomRightRadius: "8px",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
            className="text-xl"
          >
            <Typography
              sx={{
                color: "rgba(0, 0, 0, 0.6)",
                fontWeight: "600",
                fontSize: "19px",
              }}
            >
              {job.category} {/* Show job category */}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {job.roles.map((role, roleIndex) => (
              <Box
                key={roleIndex}
                sx={{
                  margin: "12px 0",
                  fontSize: "16px",
                  backgroundColor: "#fff",
                  padding: "10px",
                  borderRadius: "5px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography>{role}</Typography> {/* Show job role */}
                <Box>
                  <Button
                    sx={{
                      backgroundColor: "#fff",
                      border: "1px solid #f5f5f5",
                      marginRight: "15px",
                      borderRadius: "5px",
                      color: "#000",
                      "&:hover": {
                        backgroundColor: "#182f59",
                        color: "#fff",
                      },
                    }}
                   
                  >
                    <Typography sx={{ padding: "5px" }}>Edit Job</Typography>
                  </Button>
                  <Button
                    sx={{
                      backgroundColor: "#fff",
                      border: "1px solid #f5f5f5",
                      borderRadius: "5px",
                      color: "#000",
                      "&:hover": {
                        backgroundColor: "#182f59",
                        color: "#fff",
                      },
                    }}
                    
                  >
                    <Typography sx={{ padding: "5px" }}>Delete Job</Typography>
                  </Button>
                </Box>
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

