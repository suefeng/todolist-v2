import React from "react";
import MuiAccordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

type AccordionTypes = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

const Accordion = ({
  title,
  children,
  className,
  ...props
}: AccordionTypes) => {
  return (
    <MuiAccordion {...props}>
      <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
        {title}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </MuiAccordion>
  );
};

export default Accordion;
