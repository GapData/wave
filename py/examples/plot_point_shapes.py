# Plot / Point / Shapes
# No description available.
# ---
from synth import FakeScatter
from telesync import Site, data, ui

site = Site()

page = site['/demo']


def create_fake_row(g, f, n):
    return [(g, x, y) for x, y in [f.next() for _ in range(n)]]


n = 30
f1, f2 = FakeScatter(), FakeScatter()
v = page.add('example', ui.plot_card(
    box='1 1 4 5',
    title='Point, shapes',
    data=data('product price performance', n * 2),
    vis=ui.vis([ui.mark(mark='point', x='=price', y='=performance', shape='=product', shape_range='circle square')])
))
v.data = create_fake_row('G1', f1, n) + create_fake_row('G2', f1, n)

page.sync()