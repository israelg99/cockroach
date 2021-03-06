import React from "react";
import _ from "lodash";

import { LineGraph } from "src/views/cluster/components/linegraph";
import { Metric, Axis, AxisUnits } from "src/views/shared/components/metricQuery";

import { GraphDashboardProps, nodeAddress, storeIDsForNode } from "./dashboardUtils";

export default function (props: GraphDashboardProps) {
  const { nodeIDs, nodesSummary, nodeSources, storeSources, tooltipSelection } = props;

  return [
    <LineGraph
      title="SQL Queries"
      sources={nodeSources}
      tooltip={
        `The average number of SELECT, INSERT, UPDATE,
           and DELETE statements per second ${tooltipSelection}.`
      }
    >
      <Axis>
        <Metric name="cr.node.sql.select.count" title="Total Reads" nonNegativeRate />
        <Metric name="cr.node.sql.distsql.select.count" title="DistSQL Reads" nonNegativeRate />
        <Metric name="cr.node.sql.update.count" title="Updates" nonNegativeRate />
        <Metric name="cr.node.sql.insert.count" title="Inserts" nonNegativeRate />
        <Metric name="cr.node.sql.delete.count" title="Deletes" nonNegativeRate />
      </Axis>
    </LineGraph>,

    <LineGraph
      title="Service Latency: SQL, 99th percentile"
      tooltip={(
        <div>
          Over the last minute, this node executed 99% of queries within this time.&nbsp;
            <em>This time does not include network latency between the node and client.</em>
        </div>
      )}
    >
      <Axis units={AxisUnits.Duration}>
        {
          _.map(nodeIDs, (node) => (
            <Metric
              key={node}
              name="cr.node.sql.service.latency-p99"
              title={nodeAddress(nodesSummary, node)}
              sources={[node]}
              downsampleMax
            />
          ))
        }
      </Axis>
    </LineGraph>,

    <LineGraph
      title="Replicas per Node"
      tooltip={(
        <div>
          The number of range replicas stored on this node.&nbsp;
            <em>Ranges are subsets of your data, which are replicated to ensure survivability.</em>
        </div>
      )}
    >
      <Axis>
        {
          _.map(nodeIDs, (nid) => (
            <Metric
              key={nid}
              name="cr.store.replicas"
              title={nodeAddress(nodesSummary, nid)}
              sources={storeIDsForNode(nodesSummary, nid)}
            />
          ))
        }
      </Axis>
    </LineGraph>,

    <LineGraph
      title="Capacity"
      sources={storeSources}
      tooltip={(
        <div>
          <dl>
            <dt>Capacity</dt>
            <dd>
              Total disk space available {tooltipSelection} to CockroachDB.
                <em>
                Control this value per node with the
                  <code>
                  <a
                    href="https://www.cockroachlabs.com/docs/stable/start-a-node.html#flags"
                    target="_blank"
                  >
                    --store
                    </a>
                </code>
                flag.
                </em>
            </dd>
            <dt>Available</dt>
            <dd>Free disk space available {tooltipSelection} to CockroachDB.</dd>
            <dt>Used</dt>
            <dd>Disk space used {tooltipSelection} by CockroachDB.</dd>
          </dl>
        </div>
      )}
    >
      <Axis units={AxisUnits.Bytes}>
        <Metric name="cr.store.capacity" title="Capacity" />
        <Metric name="cr.store.capacity.available" title="Available" />
        <Metric name="cr.store.capacity.used" title="Used" />
      </Axis>
    </LineGraph>,

  ];
}
