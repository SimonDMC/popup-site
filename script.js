async function copyCode(e) {
    let code = e.target;
    let content = code.innerHTML;
    await navigator.clipboard.writeText(
        content.replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    );
    code.innerHTML = "Copied!";
    await new Promise((resolve) => setTimeout(resolve, 1000));
    code.innerHTML = content;
}
