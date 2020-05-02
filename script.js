(() => {
    let w = window,
        l = location,
        d = document,
        c = d.getElementById("c"),
        f = d.getElementById("f");
    w.onload = w.onpopstate = () => {
        n = l.hash || "#main";
        fetch("blog/" + n.replace("#", "")).then((r) => {
            return r.ok
                ? r.text()
                : "<h1>404</h1>"
        }).then((t) => {
            fetch("blog/main");
            t.replace(/#(\S+)\"/g, (all, tag) => {
                fetch("blog/" + tag);
                return tag
            });
            c.innerHTML = t;
            c.style.visibility = f.style.visibility = "visible";
            d.title = d
                .getElementById("t")
                .innerHTML;
            window.scrollTo(0, 0);
            if (n != l.hash) 
                history.replaceState(null, null, n)
        })
    }
})()