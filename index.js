const QueryType = {
  Match: 'match',
  Not: 'not',
};
const ValueType = {
  Literal: 'literal',
  Gt: 'gt',
  Lt: 'lt',
  Gte: 'gte',
  Lte: 'lte',
  In: 'in',
};

const getQueryType = (key) => {
  if (!key)
    throw new Error('malformed query');

  if (key[0] === '-') return QueryType.Not;
  return QueryType.Match;
};
const getValueType = (value) => {
  if (!value)
    throw new Error('malformed query');

  if (value[0] === '>' && value[1] === '=')
    return [ValueType.Gte, value.substr(2)];
  if (value[0] === '>')
    return [ValueType.Gt, value.substr(1)];
  if (value[0] === '<' && value[1] === '=')
    return [ValueType.Lte, value.substr(2)];
  if (value[0] === '<')
    return [ValueType.Lt, value.substr(1)];
  return [ValueType.Literal, value];
};

const unwrap = (input) => {
  if (input[0] === '"' && input[input.length - 1] === '"')
    return input.substr(1, input.length - 2);
  return input;
};
const buildValue = (input) => {
  const [type, _value] = getValueType(input);
  const value = unwrap(_value);

  if (type === ValueType.Literal)
    return value;
  if (type === ValueType.Gt)
    return { $gt: value };
  if (type === ValueType.Gte)
    return { $gte: value };
  if (type === ValueType.Lte)
    return { $le: value };
  if (type === ValueType.Lt)
    return { $lte: value };
  if (type === ValueType.In)
    return { $in: value };
  return value;
};
const q2mongo = (input) => {
  if (!input) return {};

  const tokens = input.match(/(?:[^\s"]+|"[^"]*")+/g);
  const query = {};
  for (const token of tokens) {
    const [key, _value] = token.split(':');
    const value = buildValue(_value);
    const type = getQueryType(key);

    if (type === QueryType.Match) {
      query[key] = value;
    } else if (type === QueryType.Not) {
      query[key] = { $not: value };
    }
  }

  return query;
};
module.exports = q2mongo;
