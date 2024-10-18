import html2pdf from "html2pdf.js";
import { Button } from "@mui/material";


const DownloadPDF = ({ rootElementId, downloadFileName }) => {
    const downloadPDF = () => {
        const element = document.getElementById(rootElementId);
        if (!element) {
            alert("Error: Could not find CV content. Please try again.");
            return;
        }

        const opt = {
            margin: [10, 15, 10, 15],
            filename: downloadFileName,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 3 },
            jsPDF: { unit: "mm", format: "letter", orientation: "portrait" },
        };

        html2pdf()
            .set(opt)
            .from(element)
            .save()
            .then(() => {
            })
            .catch((error) => {
                alert("Error generating PDF. Please check the console for details.");
            });
    };

    return (
        <Button id="downloadBtn" onClick={downloadPDF} variant='contained' sx={{ backgroundColor: 'red', color: 'white', borderRadius: 5 }} size='small'>Save as PDF</Button>
    );
};


export default DownloadPDF;