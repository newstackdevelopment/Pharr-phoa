import React from "react";
import { Document, Page, Text, StyleSheet, Font, Image } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import { dictionary } from "../../../utilities/Dictionary/translation";
// import { resizeImage } from "../utilities";

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Oswald",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: "Oswald",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },

  infoSection: {
    margin: 2,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
    width: "150",
    height: "25px",
    borderBottom: "1",
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "left",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

export default function PDFExport({ signature, userName, address, agree, language }) {
  const dict = dictionary[language].pdfExport;
  //   const generalDict = dictionary[language].general;
  return (
    <Document title="Article IX   General Provisions">
      <Page style={styles.body}>
        <Text style={styles.header} fixed>
          {dict.title}
        </Text>
        <Text style={styles.subtitle}>{dict.article}</Text>
        <Text style={styles.subtitle}>{dict.ammendment}</Text>
        <Text style={styles.text}>{dict.oldAmmendment}</Text>
        <Text style={styles.subtitle}>{dict.proposed}</Text>
        <Text style={styles.subtitle}>{dict.ammendment}</Text>
        <Text style={styles.text}>{dict.proposedAmmendment}</Text>
        <Text style={styles.text}>
          {agree && <div>[X]</div>}
          {!agree && <div>[ ]</div>} {dict.yesVote}
        </Text>
        <Text style={styles.text}>
          {!agree && <div>[X]</div>}
          {agree && <div>[ ]</div>} {dict.noVote}
        </Text>
        <Text style={styles.infoSection} Property>
          {" "}
          Owner:{userName}
        </Text>
        <Text style={styles.infoSection}>Owner Address:{address}</Text>
        <Text style={styles.infoSection}>Property Address: {address}</Text>
        <Text style={styles.infoSection}>Date: {new Date().toLocaleDateString("en-US")}</Text>
        <Image style={styles.image} source={signature} />
        <Text style={styles.infoSection}>Signature:</Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          fixed
        />
      </Page>
    </Document>
  );
}
PDFExport.propTypes = {
  signature: PropTypes.string.isRequired,
  userName: PropTypes.string,
  address: PropTypes.string,
  agree: PropTypes.bool,
  language: PropTypes.string,
};
PDFExport.defaultProps = {
  userName: "Eddy Hernandez",
  address: "609 Melanie Dr",
  agree: true,
  language: "en-US",
};
