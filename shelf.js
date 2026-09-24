// The shelf on the home page: three tags, and which one's the better buy.
(() => {
  // Three shelves, priced as a shopper finds them. "qty" is what the pack
  // holds in the shelf's unit (litres, 100 ml, kg).
  const shelves = {
    milk: {
      unit: "litre", short: "L",
      tags: [
        { name: "Fresh milk 1L", price: 7.49, qty: 1, amount: "1 L" },
        { name: "Fresh milk 2L", price: 13.99, qty: 2, amount: "2 L" },
        { name: "Fresh milk 1L", band: "2 untuk RM14.50", big: 14.5, price: 14.5, qty: 2, amount: "2 × 1 L", deal: "2 untuk RM14.50" },
      ],
    },
    shampoo: {
      unit: "100 ml", short: "100 ml",
      tags: [
        { name: "Shampoo 400ml", price: 15.9, qty: 4, amount: "400 ml" },
        { name: "Shampoo 750ml", price: 27.9, qty: 7.5, amount: "750 ml" },
        { name: "Shampoo 400ml", band: "Beli 2 Percuma 1", big: 15.9, price: 31.8, qty: 12, amount: "3 × 400 ml", deal: "Beli 2 Percuma 1" },
      ],
    },
    rice: {
      unit: "kg", short: "kg",
      tags: [
        { name: "Beras wangi 10kg", price: 56.9, qty: 10, amount: "10 kg" },
        { name: "Beras wangi 5kg", price: 26.9, qty: 5, amount: "5 kg", jimat: "Jimat RM3.00", was: 29.9 },
        { name: "Beras wangi 5kg", band: "2 untuk RM58", big: 58, price: 58, qty: 10, amount: "2 × 5 kg", deal: "2 untuk RM58" },
      ],
    },
  };
  const letters = ["A", "B", "C"];
  const round2 = (x) => Math.round((x + 1e-9) * 100) / 100;
  const rm = (x) => "RM " + round2(x).toFixed(2);
  const rmTag = (x) => "RM " + (Number.isInteger(x) ? x : x.toFixed(2));

  const tagsEl = document.getElementById("tags");
  const frame = document.getElementById("frame");
  const pick = document.getElementById("pick");
  const unit = document.getElementById("unit");
  const why = document.getElementById("why");
  let current = "milk";

  function tagHtml(t, i, per, best) {
    const shelfPrice = t.big ?? t.price;
    const [whole, cents] = shelfPrice.toFixed(2).split(".");
    const more = Math.round((per / best - 1) * 100);
    const chips = [`<span class="chip">${rm(per)} / ${shelf().short}</span>`];
    if (more === 0) chips.push('<span class="chip best">Better buy</span>');
    else if (t.deal) chips.push(`<span class="chip trap">Deal +${more}%</span>`);
    else chips.push(`<span class="chip more">+${more}%</span>`);
    return `<div class="tag-slot">
      <div class="tag" data-best="${more === 0}">
        <span class="letter">${letters[i]}</span>
        <div class="name">${t.name}</div>
        ${t.band ? `<div class="band">${t.band}</div>` : ""}
        <div class="price"><span class="rm">RM</span><span class="whole">${whole}</span><span class="cents">${cents}</span></div>
        <div class="small">${t.jimat ? `<span class="jimat">${t.jimat}</span> · <span class="was">RM${t.was.toFixed(2)}</span>` : t.deal ? "Harga promosi" : `${rm(t.price / t.qty)}/${shelf().short}`}</div>
      </div>
      <div class="reading">${chips.join("")}</div>
    </div>`;
  }

  function shelf() { return shelves[current]; }

  function render() {
    const s = shelf();
    const pers = s.tags.map((t) => round2(t.price / t.qty));
    const best = Math.min(...pers);
    const w = pers.indexOf(best);
    tagsEl.innerHTML = s.tags.map((t, i) => tagHtml(t, i, pers[i], best)).join("");
    const winner = s.tags[w];
    pick.textContent = `Pick ${letters[w]}: ${winner.amount} for ${rm(winner.price)}`;
    unit.innerHTML = `${rm(best)} <small>per ${s.unit}</small>`;
    const lines = [`Cheapest per ${s.unit}.`];
    if (winner.jimat) lines.push(`“${winner.jimat}” is what you save, not the price.`);
    if (winner.deal) lines.push(`The ${winner.deal} deal really is cheaper.`);
    s.tags.forEach((t, i) => {
      if (t.deal && i !== w) {
        const more = Math.round((pers[i] / best - 1) * 100);
        lines.push(`${letters[i]}, the ${t.deal} deal, looks like the bargain but costs ${more}% more per ${s.unit}.`);
      }
    });
    why.textContent = lines.join(" ");
    placeFrame();
  }

  function placeFrame() {
    const tag = tagsEl.querySelector('.tag[data-best="true"]');
    if (!tag) return;
    const box = tagsEl.parentElement.getBoundingClientRect();
    const r = tag.getBoundingClientRect();
    const pad = 7;
    frame.style.width = r.width + pad * 2 + "px";
    frame.style.height = r.height + pad * 2 + "px";
    frame.style.transform = `translate(${r.left - box.left - pad}px, ${r.top - box.top - pad}px)`;
  }

  document.querySelectorAll(".switch button").forEach((b) => {
    b.addEventListener("click", () => {
      current = b.dataset.shelf;
      document.querySelectorAll(".switch button").forEach((o) => o.setAttribute("aria-pressed", String(o === b)));
      render();
    });
  });
  addEventListener("resize", placeFrame);
  if (document.fonts) document.fonts.ready.then(placeFrame);
  render();
})();
