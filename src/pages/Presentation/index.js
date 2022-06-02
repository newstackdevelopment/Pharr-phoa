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

import MKTypography from "components/MKTypography";
import SignatureCanvas from "react-signature-canvas";

import DefaultFooter from "examples/Footers/DefaultFooter";

// Routes
import footerRoutes from "footer.routes";

// Images
import bgImage from "assets/images/phoa/phoaHome.jpg";
import {
  TableBody,
  TableHead,
  Table,
  TableRow,
  TableCell,
  Button,
  Stack,
  Snackbar,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { useState, useCallback, createRef, useEffect } from "react";
import PDFExport from "components/custom/PDFExport/PDFExport";
import { /* PDFViewer, */ pdf } from "@react-pdf/renderer";
import { dictionary } from "../../utilities/Dictionary/translation";
// eslint-disable-next-line
const MAILGUN_KEY = "YXBpOjA2Mzc3NDgwYTQzMjk0Njc1OTJhMDI1ZDFjNDVmMDIxLTI3YTU2MmY5LTQ3ODllYTU4";
// eslint-disable-next-line
const MAILGUN_URL =
  "https://api.mailgun.net/v3/sandboxefb83a85b48c48259af8bf536e83235b.mailgun.org/messages";
// eslint-disable-next-line
function sendEmail(email) {
  const params = {
    from: email.fromName,
    to: email.toEmail,
    subject: email.subject,
    html: email.message,
    attachment: email.attachment,
  };
  const formData = new FormData();
  Object.keys(params).forEach((property) => {
    formData.append(property, params[property]);
  });
  const options = {
    method: "post",
    body: formData,
    headers: {
      Authorization: `Basic ${MAILGUN_KEY}`,
    },
  };
  fetch(MAILGUN_URL, options);
}

function Presentation() {
  const [{ accept, deny }, setCheckboxStates] = useState({ accept: false, deny: false });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snickerOpen, setSnickerOpen] = useState(false);
  const [signature, setSignature] = useState();
  const [language, setLanguage] = useState("en-US");
  const [model, setModel] = useState({ name: "", address: "" });
  const signatureRef = createRef();

  const onAcceptChecked = useCallback(() => {
    setCheckboxStates({ deny: deny ? !deny : deny, accept: !accept });
  }, [accept, deny]);
  const onDenyChecked = useCallback(() => {
    setCheckboxStates({ accept: accept ? !accept : accept, deny: !deny });
  }, [accept, deny]);
  const onLanguageChange = useCallback(
    (e) => {
      setLanguage(e.target.value);
    },
    [setLanguage]
  );
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
  }, [signatureRef, setSignature]);
  useEffect(() => {
    if (signature) {
      const MyDoc = (
        <PDFExport
          name={model.name}
          address={model.address}
          signature={signature}
          agree={accept}
          language={language}
        />
      );
      const blob = pdf(MyDoc).toBlob();
      blob.then((blobValue) => {
        const file = new File([blobValue], "singedCovenant.pdf", {
          lastModified: new Date().getTime(),
        });
        const email = {
          attachment: file,
        };
        email.toEmail = "eddyhernandez0921@live.com";
        email.fromEmail = "eddyhernandez0921@live.com";
        email.fromName = "PHOA AutoSystem@phoa.com";
        email.subject = "test Email";
        email.message = "sdfsdfasdf";
        sendEmail(email);
      });
    }
  }, [signature, model, accept, language]);
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
          <Grid sx={{ textAlign: "right", marginBottom: "50px" }}>
            <FormControl variant="standard" size="large" sx={{ m: 1, minWidth: "200px" }}>
              <InputLabel id="demo-simple-select-standard-label">
                <h3>{dict.selectLanguage}</h3>
              </InputLabel>
              <Select
                autoWidth
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={language}
                onChange={onLanguageChange}
                label="Age"
              >
                <MenuItem value="en-US">English</MenuItem>
                <MenuItem value="sp-MEX">Español</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Divider />
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
    </>
  );
}

export default Presentation;
