/*
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import MKBox from "components/MKBox";
// import useMediaQuery from "@mui/material/useMediaQuery";
import MKTypography from "components/MKTypography";
// import MKSocialButton from "components/MKSocialButton";
import SignatureCanvas from "react-signature-canvas";
// Material Kit 2 React examples
// import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
// import FilledInfoCard from "examples/Cards/InfoCards/FilledInfoCard";
// import { PDFViewer } from "@react-pdf/renderer";
// // Presentation page sections
// import Counters from "pages/Presentation/sections/Counters";
// import Information from "pages/Presentation/sections/Information";
// import DesignBlocks from "pages/Presentation/sections/DesignBlocks";
// import Pages from "pages/Presentation/sections/Pages";
// import Testimonials from "pages/Presentation/sections/Testimonials";
// import Download from "pages/Presentation/sections/Download";

// // Presentation page components
// import BuiltByDevelopers from "pages/Presentation/components/BuiltByDevelopers";

// Routes
// import routes from "routes";
import footerRoutes from "footer.routes";

// Images
import bgImage from "assets/images/phoa/phoaHome.jpg";
import {
  // FormControlLabel,
  // FormGroup,
  TableBody,
  // TableContainer,
  TableHead,
  Table,
  TableRow,
  TableCell,
  Button,
  // ButtonGroup,
  Stack,
  Snackbar,
  // Input,
  TextField,
} from "@mui/material";
import { useState, useCallback, createRef } from "react";
import PDFExport from "components/custom/PDFExport/PDFExport";
import { PDFViewer } from "@react-pdf/renderer";
import { dictionary } from "../../utilities/Dictionary/translation";

// import { useTheme } from "@mui/material/styles";
function Presentation() {
  const [{ accept, deny }, setCheckboxStates] = useState({ accept: false, deny: false });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snickerOpen, setSnickerOpen] = useState(false);
  const [pdfDialogOpen, setPdfDialogOpen] = useState(false);
  const [signature, setSignature] = useState();
  const [language] = useState("sp-MEX");
  const [model, setModel] = useState({ name: "", address: "" });
  const signatureRef = createRef();

  const onAcceptChecked = useCallback(() => {
    setCheckboxStates({ deny: deny ? !deny : deny, accept: !accept });
  }, [accept, deny]);
  const onDenyChecked = useCallback(() => {
    setCheckboxStates({ accept: accept ? !accept : accept, deny: !deny });
  }, [accept, deny]);
  const submitClicked = useCallback(() => {
    setDialogOpen(true);
  }, [accept, deny]);
  const handleSnickerClose = useCallback(() => {
    setSnickerOpen(false);
  }, [setSnickerOpen]);
  const signatureCancelClicked = useCallback(() => {
    setSnickerOpen(true);
    setDialogOpen(false);
  }, [setSnickerOpen]);
  const signatureAccepted = useCallback(() => {
    const formSignature = signatureRef.current.toDataURL();

    setSignature(formSignature);
    setDialogOpen(false);
    setPdfDialogOpen(true);
  }, [signatureRef, setPdfDialogOpen, setSignature]);
  const clearSignatureClicked = useCallback(() => {
    signatureRef.current.clear();
  }, [signatureRef]);
  const onInputChange = useCallback(
    (e) => {
      setModel((existing) => ({ ...existing, [e.target.id]: e.target.value }));
    },
    [setModel]
  );
  const dict = dictionary[language].presentation;
  const generalDict = dictionary[language].general;
  return (
    <>
      {/* <DefaultNavbar routes={routes} sticky /> */}
      <MKBox
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
            <MKTypography
              variant="h1"
              color="white"
              mt={-6}
              mb={1}
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              {dict.header}
            </MKTypography>
            <MKTypography
              variant="body1"
              color="white"
              textAlign="center"
              px={{ xs: 6, lg: 12 }}
              mt={1}
            >
              {dict.description}
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <Container sx={{ mt: 6 }}>
          <MKTypography
            variant="h3"
            mt={-6}
            mb={1}
            textAlign="center"
            sx={({ breakpoints, typography: { size } }) => ({
              [breakpoints.down("md")]: {
                fontSize: size["3xl"],
              },
            })}
          >
            {dict.formDescription}
          </MKTypography>
          <Divider />
          <Table>
            <TableHead />
            <TableBody>
              <TableRow key="acceptRole">
                <TableCell align="right" component="th">
                  <Checkbox checked={accept} onChange={onAcceptChecked} />
                </TableCell>
                <TableCell align="right">{dict.acceptVerbage}</TableCell>
              </TableRow>
              <TableRow key="reject">
                <TableCell align="right" component="th">
                  <Checkbox checked={deny} onChange={onDenyChecked} />
                </TableCell>
                <TableCell align="right">{dict.denyVerbage}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          {(accept || deny) && (
            <Button size="large" onClick={submitClicked}>
              {generalDict.next}
            </Button>
          )}
        </Container>
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
      <Dialog open={dialogOpen}>
        <Card
          sx={{
            backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
            backdropFilter: "saturate(200%) blur(30px)",
            boxShadow: ({ boxShadows: { xxl } }) => xxl,
          }}
        >
          <MKTypography variant="h4" align="center">
            {dict.name}
          </MKTypography>
          <TextField onChange={onInputChange} id="name" variant="outlined" />
          <Divider />
          <MKTypography variant="h4" align="center">
            {dict.address}
          </MKTypography>
          <TextField onChange={onInputChange} id="address" variant="outlined" />
          <Divider />
          <MKTypography variant="h4" align="center">
            {dict.signatureDescription}
          </MKTypography>
          <Divider />
          <SignatureCanvas
            penColor="black"
            canvasProps={{ width: 500, height: 200, className: "sigCanvas" }}
            ref={signatureRef}
          />
          <Divider />
          <Stack spacing={3} direction="row" alignItems="center" justifyContent="center">
            <Button size="large" onClick={signatureCancelClicked}>
              {generalDict.cancel}
            </Button>
            <Button size="large" onClick={clearSignatureClicked}>
              {dict.clearSignature}
            </Button>
            <Button size="large" onClick={signatureAccepted}>
              {generalDict.accept}
            </Button>
          </Stack>
        </Card>
      </Dialog>
      <Snackbar
        open={snickerOpen}
        autoHideDuration={6000}
        onClose={handleSnickerClose}
        message="Request canceled no action neeed."
        severity="info"
      />
      <Dialog fullScreen open={pdfDialogOpen}>
        {signature && (
          <PDFViewer style={{ width: "100vh", height: "100vh" }}>
            <PDFExport
              name={model.name}
              address={model.address}
              signature={signature}
              agree={accept}
              language={language}
            />
          </PDFViewer>
        )}
      </Dialog>
    </>
  );
}

export default Presentation;
