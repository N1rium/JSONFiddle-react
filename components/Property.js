import { isString, isNumber, isBoolean, isNull, isArray, isObject, getObjectLength } from '../util';
import { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.span`
  font-family: 'Courier New', monospace;
  word-spacing: -4px;

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0 0 0 20px;
  }

  li:not(:last-child):after {
    content: ',';
  }

  .array {
    & > .toggle,
    & > .toggle-end {
      color: #a40000;
    }
  }

  .object {
    & > .toggle,
    & > .toggle-end {
      color: #729fcf;
    }
  }

  .toggle {
    cursor: pointer;
    &:before {
      border-radius: 2px;
      border-color: #aaa;
      border-style: solid;
      border-width: 0.1em;
      color: #aaa;
      content: '-';
      display: inline-block;
      line-height: 7px;
      margin: 0 2px;
      overflow: hidden;
      padding: 0;
    }

    &:hover {
      font-weight: bold;
      & + ul {
        opacity: 0.2;
      }

      & ~ .toggle-end {
        font-weight: bold;
      }
    }
  }

  .collapsed {
    & > ul {
      display: none !important;
    }

    & > .toggle {
      &:before {
        content: '+';
      }
    }
  }
`;

const Num = styled.span`
  color: #ad7fa8;
`;

const String = styled.span`
  color: #4e9a06;
  &:before,
  &:after {
    content: '"';
  }
`;

const Bool = styled.span`
  color: #c4a000;
`;

const Null = styled.span`
  color: #babdb6;
`;

const Key = styled.span`
  color: #204a87;
  &:after {
    content: '":';
  }
  &:before {
    content: '"';
  }
`;

export default function Property({
  input = {
    user: { name: 'Gordon Freeman', age: 32, gender: 0, meta: { children: [32, null, 0, 1, 5] }, children: [32, 16] },
  },
  filter = '',
  level = 0,
  objKey = null,
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Wrapper>
      {objKey && <Key>{objKey}</Key>}
      {isString(input) && <String>{input}</String>}
      {isNumber(input) && <Num>{input}</Num>}
      {isBoolean(input) && <Bool>{input}</Bool>}
      {isNull(input) && <Null>null</Null>}
      {isArray(input) && (
        <span className={`array ${collapsed ? 'collapsed' : ''}`}>
          <span className="toggle" onClick={() => setCollapsed(!collapsed)}>
            {'['}
            {collapsed && <span>{input.length}</span>}
          </span>
          <ul>
            {input.map((key, i) => (
              <li key={i}>
                <Property input={key} level={level + 1} filter={filter} />
              </li>
            ))}
          </ul>
          <span className="toggle-end">{']'}</span>
        </span>
      )}
      {isObject(input) && (
        <span className={`object ${collapsed ? 'collapsed' : ''}`}>
          <span className="toggle" onClick={() => setCollapsed(!collapsed)}>
            {'{'}
            {collapsed && <span>{getObjectLength(input)}</span>}
          </span>
          <ul>
            {Object.keys(input).map((key, i) => (
              <li key={i}>
                <Property input={input[key]} objKey={key} level={level + 1} filter={filter} />
              </li>
            ))}
          </ul>
          <span className="toggle-end">{'}'}</span>
        </span>
      )}
    </Wrapper>
  );
}
