import React from 'react';
import MuiAccordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

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
      <AccordionSummary
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        {title}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </MuiAccordion>
  );
};

export default Accordion;
