import { useState } from 'react';
import { useHookstate } from '@hookstate/core';
import { ACTIVITIES_STATE_PROVIDER } from '@/utils/states';
import { Container, Heading, HeadingContainer, Options, ItemContainer, Item } from './styles';

export const SORT_OPTIONS = {
  ASC: 'asc',
  DESC: 'desc',
};

export default function OverviewActivity() {
  const activityState = useHookstate(ACTIVITIES_STATE_PROVIDER);
  const sort = activityState.config.sort.get();
  const totalActivities = activityState.activities.length;

  const _handleSort = (sort) => () => {
    const currentSort = activityState.config.sort.get();
    if (currentSort === sort) return;

    const activities = activityState.activities.get({ noproxy: true }).reverse();
    activityState.activities.set(activities);
    activityState.config.sort.set(sort);
  };
  const _handleClear = () => {
    activityState.activities.set([]);
  };

  return (
    <Container>
      <Heading>
        <h4>Your activity</h4>
        <HeadingContainer>
          <Options
            title="Sort from oldest to latest"
            data-disabled={totalActivities === 0}
            $active={sort === SORT_OPTIONS.ASC}
            onClick={_handleSort(SORT_OPTIONS.ASC)}
          >
            oldest
          </Options>
          <Options
            title="Sort from latest to oldest"
            data-disabled={totalActivities === 0}
            $active={sort === SORT_OPTIONS.DESC}
            onClick={_handleSort(SORT_OPTIONS.DESC)}
          >
            newest
          </Options>
          <Options
            data-disabled={totalActivities === 0}
            title="Clear activities lists"
            onClick={_handleClear}
          >
            clear
          </Options>
        </HeadingContainer>
      </Heading>
      <ItemContainer>
        {activityState.activities.map((activity) => (
          <ActivityItem
            key={`${activity.title.get()}-${activity.date.get()}`}
            content={activity.get()}
          />
        ))}
        {totalActivities === 0 && <p className="empty-state">Nothing has been done!</p>}
      </ItemContainer>
    </Container>
  );
}

function ActivityItem({ content }) {
  const { title, date, type } = content;

  return (
    <Item>
      <div>
        <h5 title={title} className="truncate">
          {title}
        </h5>
        <p className="date truncate">{date}</p>
      </div>
      <p className="type">on {type}</p>
    </Item>
  );
}
