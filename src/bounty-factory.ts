import { Address, BigInt, log } from "@graphprotocol/graph-ts";
import {
  BountyClosed as BountyClosedEvent,
  BountyCreated as BountyCreatedEvent,
  BountyFunded as BountyFundedEvent,
  BountyResolved as BountyResolvedEvent,
  PropositionCreated as PropositionCreatedEvent,
} from "../generated/BountyFactory/BountyFactory";
import { Bounty, Proposition } from "../generated/schema";

export function handleBountyCreated(event: BountyCreatedEvent): void {
  let bounty = new Bounty(event.params.bounty.id);
  bounty.issuer = event.params.bounty.issuer;
  bounty.value = event.params.bounty.value;
  bounty.valueLocked = event.params.bounty.valueLocked;
  bounty.state = event.params.bounty.state;
  bounty.metadata = event.params.bounty.metadata;
  bounty.save();
}

export function handleBountyClosed(event: BountyClosedEvent): void {
  let bounty = Bounty.load(event.params.bountyId);
  if (!bounty) {
    log.error("bounty {} not found", [event.params.bountyId]);
    return;
  }
  bounty.state = 1;
  bounty.save();
}

export function handleBountyFunded(event: BountyFundedEvent): void {
  let bounty = Bounty.load(event.params.bountyId);
  if (!bounty) {
    log.error("bounty {} not found", [event.params.bountyId]);
    return;
  }
  bounty.valueLocked = true;
  bounty.value = event.params.value;
  bounty.save();
}

export function handleBountyResolved(event: BountyResolvedEvent): void {
  let bounty = Bounty.load(event.params.bountyId);
  if (!bounty) {
    log.error("bounty {} not found", [event.params.bountyId]);
    return;
  }
  bounty.state = 2;
  bounty.resolver = event.params.solver;
  bounty.save();
}

export function handlePropositionCreated(event: PropositionCreatedEvent): void {
  let bounty = Bounty.load(event.params.bountyId);
  if (!bounty) {
    log.error("bounty {} not found", [event.params.bountyId]);
    return;
  }
  let proposition = new Proposition(
    event.params.proposition.solver.toHex().concat(event.params.bountyId)
  );
  proposition.bounty = bounty.id;
  proposition.solver = event.params.proposition.solver;
  proposition.metadata = event.params.proposition.metadata;
  proposition.save();
}
