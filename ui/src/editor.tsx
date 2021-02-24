// Copyright 2020 H2O.ai, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as Fluent from '@fluentui/react'
import React from 'react'
import { stylesheet } from 'typestyle'
import { cardDefs } from './defs'
import { editorActionB, EditorActionT, noAction, pickCard } from './editing'
import { cards } from './layout'
import { bond, C, Card, Dict, qd, S } from './qd'
import { border, cssVar } from './theme'

/**
 * Create a card that enables WYSIWYG editing on a page.
 * Adding this card to a page makes it editable by end-users.
 */
interface State {
  /** The title for this card.*/
  title: S
}

const
  css = stylesheet({
    fab: {
      position: 'fixed',
      right: 20,
      bottom: 20,
      width: 56,
      height: 56,
      color: cssVar('$card'),
      background: cssVar('$text'),
      borderRadius: '50%',
      fontSize: 20,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: `0px 3px 5px ${cssVar('$text0')}`,
      $nest: {
        '&:hover': {
          boxShadow: `0px 12px 20px ${cssVar('$text2')}`,
        }
      },
    },
    panelActions: {
      marginTop: 10,
    },
    cards: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      alignContent: 'flex-start',
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      margin: 3,
      padding: 3,
      border: border(1, cssVar('$text3')),
      $nest: {
        '&:hover': {
          backgroundColor: cssVar('$text0'),
        }
      }
    },
    cardIcon: {
      width: 50,
      height: 50,
      fontSize: 22,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: cssVar('$text7'),
    },
    cardCaption: {
      marginTop: 5,
      fontSize: 11,
      width: 82,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      textAlign: 'center',
    }
  }),
  labelize = (s: S) => s.split('_').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
  toDict = <T extends unknown>(xs: T[], k: (x: T) => S): Dict<T> => {
    const d: Dict<T> = {}
    for (const x of xs) d[k(x)] = x
    return d
  },
  cardDefLookup = toDict(cardDefs, d => d.view),
  AttrPanelView = bond(({ view, card }: { view: S, card?: C }) => {
    const
      { attrs } = cardDefLookup[view],
      isNew = card ? false : true,
      original: Dict<any> = {},
      changes: Dict<any> = {}

    for (const { name, value } of attrs) original[name] = changes[name] = value

    if (card) {
      const { state } = card
      for (const k in state) {
        original[k] = changes[k] = state[k]
      }
    }

    let cardName = card ? card.name : `${view}${(new Date()).toISOString()}`

    const
      onDismiss = () => { editorActionB(noAction) },
      save = () => {
        const page = qd.edit()
        if (isNew) {
          const card: Dict<any> = { ...{ view }, ...original, ...changes }
          page.put(cardName, card)
        } else {
          for (const k in changes) {
            const v = changes[k]
            if (v !== original[k]) page.set(`${cardName} ${k}`, v)
          }
        }
        page.sync()
        editorActionB(noAction)
      },
      goBack = () => { editorActionB(pickCard) },
      abort = () => { editorActionB(noAction) },
      onChangeCardName = ({ target }: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, v?: string) => {
        cardName = v || (target as HTMLInputElement).value
      },
      renderFooter = () => {
        return (
          <Fluent.Stack horizontal tokens={{ childrenGap: 10 }}>
            <Fluent.PrimaryButton onClick={save}>{isNew ? 'Add card' : 'Save changes'}</Fluent.PrimaryButton>
            <Fluent.DefaultButton onClick={isNew ? goBack : abort}>Back</Fluent.DefaultButton>
          </Fluent.Stack>
        )
      },
      render = () => {
        const
          fields = attrs.map(attr => {
            const { name } = attr
            switch (attr.t) {
              case 'textbox':
                {
                  const onChange = ({ target }: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, v?: string) => {
                    changes[name] = v || (target as HTMLInputElement).value
                  }
                  return (
                    <Fluent.TextField
                      key={name}
                      label={labelize(name)}
                      defaultValue={changes[name]}
                      onChange={onChange} />
                  )
                }
              case 'textarea':
                {
                  const onChange = ({ target }: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, v?: string) => {
                    changes[name] = v || (target as HTMLInputElement).value
                  }
                  return (
                    <Fluent.TextField
                      key={name}
                      label={labelize(name)}
                      defaultValue={changes[name]}
                      multiline={true}
                      onChange={onChange} />
                  )
                }
              case 'spinbox':
                {
                  const
                    { min, max, step, value } = attr,
                    defaultValue = (value < min) ? min : ((value > max) ? max : value)

                  changes[name] = defaultValue

                  const
                    parseValue = (v: string) => {
                      const x = parseFloat(v)
                      return (!isNaN(x) && isFinite(x)) ? x : value
                    },
                    onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
                      changes[name] = parseValue(e.target.value)
                    },
                    onIncrement = (v: string) => {
                      const
                        value = parseValue(v),
                        newValue = (value + step > max) ? max : value + step
                      changes[name] = newValue
                      return String(newValue)
                    },
                    onDecrement = (v: string) => {
                      const
                        value = parseValue(v),
                        newValue = (value - step < min) ? min : value - step
                      changes[name] = newValue
                      return String(newValue)
                    }

                  return (
                    <Fluent.SpinButton
                      key={name}
                      label={labelize(name)}
                      min={min}
                      max={max}
                      step={step}
                      defaultValue={`${changes[name]}`}
                      onBlur={onBlur}
                      onIncrement={onIncrement}
                      onDecrement={onDecrement}
                    />
                  )
                }
              case 'record':
                return (
                  <div key={name}>
                    <Fluent.Label>{labelize(name)}</Fluent.Label>
                    <Fluent.MessageBar messageBarType={Fluent.MessageBarType.warning}>Could not render field</Fluent.MessageBar>
                  </div>
                )
            }
          })
        return (
          <Fluent.Panel
            headerText={isNew ? 'Add card' : 'Edit card'}
            isOpen={true}
            isLightDismiss={true}
            onDismiss={onDismiss}
            onRenderFooterContent={renderFooter}
            isFooterAtBottom={true}
          >
            <Fluent.Separator>{labelize(view)} Card</Fluent.Separator>
            {isNew ? <Fluent.TextField label='Card Name' defaultValue={cardName} onChange={onChangeCardName} /> : null}
            <div>{fields}</div>
          </Fluent.Panel>
        )
      }
    return { render }
  })

export const
  View = bond(({ name, changed }: Card<State>) => {
    const
      addCard = () => { editorActionB(pickCard) },
      onDismiss = () => { editorActionB(noAction) },
      render = () => {
        let content: JSX.Element | null = null
        const
          action = editorActionB()

        switch (action.t) {
          case EditorActionT.Add:
            content = <AttrPanelView view={action.view} />
            break
          case EditorActionT.Edit:
            {
              const page = qd.page
              if (page) {
                const
                  { name } = action,
                  card = page.get(name)
                if (card) content = <AttrPanelView view={card.state.view} card={card} />
              }
            }
            break
          case EditorActionT.Pick:
            {
              const choices = cardDefs.map(({ view, icon }) => {
                const onClick = () => { editorActionB({ t: EditorActionT.Add, view }) }
                return (
                  <div key={view} className={css.card} onClick={onClick}>
                    <div className={css.cardIcon} >
                      <Fluent.FontIcon iconName={icon} />
                    </div>
                    <div className={css.cardCaption}>{labelize(view)}</div>
                  </div>
                )
              })
              content = (
                <Fluent.Panel headerText='Add a card' isLightDismiss={true} onDismiss={onDismiss} isOpen={true} >
                  <div className={css.cards}>{choices}</div>
                </Fluent.Panel>
              )
            }
            break
        }
        return (
          <div data-test={name}>
            <div className={css.fab} onClick={addCard} >
              <Fluent.FontIcon iconName='Add' />
            </div>
            {content}
          </div>
        )
      }
    return { render, changed, editorActionB }
  })

cards.register('editor', View)
