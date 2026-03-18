import { Button } from '../Button';

import {
  ActionRow,
  Description,
  Surface,
  Title,
} from './styles';

const AsyncState = ({ actionLabel, description, onAction, title }) => {
  return (
    <Surface>
      {title ? <Title>{title}</Title> : null}
      {description ? <Description>{description}</Description> : null}

      {actionLabel && onAction ? (
        <ActionRow>
          <Button type="button" variant="secondary" onClick={onAction} title={actionLabel} />
        </ActionRow>
      ) : null}
    </Surface>
  );
};

export { AsyncState };
