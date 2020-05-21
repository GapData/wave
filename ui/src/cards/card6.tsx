import React from 'react';
import { stylesheet } from 'typestyle';
import { Card, Data, decode, F, Rec, S } from '../delta';
import { cards, Format, Rect, grid } from '../grid';
import { MicroBars } from './microbars';
import { MicroArea } from './microline';
import { getTheme } from '../theme';
import bond from '../bond';

const
  theme = getTheme(),
  plotHeight = grid.unitHeight,
  css = stylesheet({
    card: {
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      ...theme.font.s12,
      ...theme.font.w6,
    },
    value: {
      ...theme.font.s24,
      ...theme.font.w3,
    },
    aux_value: {
      ...theme.font.s12,
      color: theme.colors.text7,
    },
    plot: {
      position: 'absolute',
      left: -grid.gap,
      bottom: -grid.gap,
      height: plotHeight,
    }
  })

interface State {
  rect: Rect
  title: S
  value: S
  aux_value: S
  data: S | Rec
  plot_type: 'area' | 'interval'
  plot_data: S | Data
  plot_color: S
  plot_category: S
  plot_value: S
  plot_zero_value: F
  plot_curve: S
}

const defaults: Partial<State> = {
  title: 'Untitled',
  plot_type: 'area',
  plot_data: '',
  plot_color: theme.colors.gray,
  plot_curve: 'linear',
}

const
  View = bond(({ state, changed }: Card<State>) => {
    const
      render = () => {
        const
          s = theme.merge(defaults, state),
          plotWidth = s.rect.width,
          data = decode(s.data),
          plot = s.plot_type === 'area'
            ? (
              <MicroArea
                width={plotWidth}
                height={plotHeight}
                data={decode(s.plot_data)}
                value={s.plot_value}
                color={s.plot_color}
                zeroValue={s.plot_zero_value}
                curve={s.plot_curve}
              />
            ) : (
              <MicroBars
                width={plotWidth}
                height={plotHeight}
                data={decode(s.plot_data)}
                category={s.plot_category}
                value={s.plot_value}
                color={s.plot_color}
                zeroValue={s.plot_zero_value}
              />
            )

        return (
          <div className={css.card}>
            <div className={css.title}>
              <Format data={data} format={s.title} />
            </div>
            <div className={css.value}>
              <Format data={data} format={s.value} />
            </div>
            <div className={css.aux_value}>
              <Format data={data} format={s.aux_value} />
            </div>
            <div className={css.plot}>{plot}</div>
          </div>)
      }
    return { render, changed }
  })

cards.register('card6', View)


