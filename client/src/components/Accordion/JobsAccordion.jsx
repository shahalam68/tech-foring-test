import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

export default function JobsAccordion() {
  return (
    <div>
      <Accordion 
        className="mb-4 mt-4" 
        sx={{ 
          border: "2px solid rgba(0,0,0,.2)", 
          boxShadow: "none", 
          backgroundColor:"#f5f5f5",
          borderRadius: "8px", 
          '&:first-of-type': { borderTopLeftRadius: "8px", borderTopRightRadius: "8px" },
          '&:last-of-type': { borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px" },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          className="text-xl"
        >
          <Typography sx={{color:'rgba(0, 0, 0, 0.6)',fontWeight:"600",fontSize:"19px"}}>
            Soykot Alam
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="w-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-5 mt-8 ">
            {/* Content goes here */}
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion 
        className="mb-4 mt-4" 
        sx={{ 
          border: "2px solid rgba(0,0,0,.2)", 
          backgroundColor:"#f5f5f5",
          boxShadow: "none", 
          borderRadius: "8px", 
          '&:first-of-type': { borderTopLeftRadius: "8px", borderTopRightRadius: "8px" },
          '&:last-of-type': { borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px" },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
          className="text-xl"
        >
          Soykot Alam
        </AccordionSummary>
        <AccordionDetails>
          <div className="w-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-5 mt-8 ">
            {/* Content goes here */}
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion 
        className="mb-4 mt-4 hover:bg-blue-200" 
        sx={{ 
          border: "2px solid rgba(0,0,0,.2)", 
          backgroundColor:"#f5f5f5",
          boxShadow: "none", 
          borderRadius: "8px", 
          '&:first-of-type': { borderTopLeftRadius: "8px", borderTopRightRadius: "8px" },
          '&:last-of-type': { borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px" },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
          className="text-xl"
        >
          Soykot Alam
        </AccordionSummary>
        <AccordionDetails>
          <div className="w-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-5 mt-8 ">
            {/* Content goes here */}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
