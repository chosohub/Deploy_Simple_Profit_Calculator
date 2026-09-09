import {Link} from "@mui/material";

export default function GithubLink() {
    return (
        <Link
            href="https://github.com/chosohub/Deploy_Simple_Profit_Calculator.git"
            underline="hover"
            color="textSecondary"
            variant="caption"
            sx={{fontFamily: "monospace"}}
        >
            View Source Code & Submit Feedback on GitHub
        </Link>
    )
}