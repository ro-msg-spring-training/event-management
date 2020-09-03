import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import { Ticket } from '../../../model/Ticket';
import { Link } from 'react-router-dom';
import { Button, TableCell } from '@material-ui/core';
import { useStyles } from '../../../styles/CommonStyles';
import { useStylesTickets } from '../../../styles/ticketsListStyles';
import { useTranslation } from 'react-i18next';

interface Props {
  ticket: Ticket;
  open: any;
}

const TicketCollapseDumb = ({ ticket, open }: Props) => {
  const commonClasses = useStyles();
  const classes = useStylesTickets();
  const [t] = useTranslation();

  const styles = {
    none: {
      display: 'none',
    },
    fixed: {
      tableLayout: "fixed",
      display: 'contents',
    }
  };
  const { none, fixed } = styles;

  // TODO: when backend done, add link to PDFs here
  return (
    <TableRow style={open ? fixed : none}>
        <TableCell className={classes.tableCellPadding} />
        <TableCell className={classes.tableCellPadding} />
        <TableCell
          className={classes.tableCellPadding}
          key={'date'}
          align={'center'}
          padding={'default'}
          size={'small'}
        >
          {ticket.bookingDate}
        </TableCell>
        <TableCell
          className={classes.tableCellPadding}
          key={'eventName'}
          align={'center'}
          padding={'default'}
          size={'small'}
        >
          {ticket.eventName}
        </TableCell>
        <TableCell
          key={'category'}
          align={'center'}
          padding={'default'}
          size={'small'}
          className={`${classes.ticketColumnMobile} ${classes.tableCellPadding}`}
        >
          {ticket.ticketCategory}
        </TableCell>
        <TableCell
          key={'name'}
          align={'center'}
          padding={'default'}
          size={'small'}
          className={`${classes.ticketColumnMobile} ${classes.tableCellPadding}`}
        >
          {ticket.name}
        </TableCell>

        <TableCell
          key={'pdfUrl'}
          align={'center'}
          size={'medium'}
          className={`${classes.pdfButton} ${classes.tableCellPadding}`}
        >
          <Link to={''} className={classes.linkDecoration}>
            <Button
              className={`${commonClasses.mainButtonStyle} ${commonClasses.pinkGradientButtonStyle} ${commonClasses.mobileButton}`}
            >
              {t('eventList.open')}
            </Button>
          </Link>
        </TableCell>
    </TableRow>
  );
};

export default TicketCollapseDumb;
