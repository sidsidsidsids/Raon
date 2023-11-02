package com.arch.raon.domain.grammar.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.arch.raon.domain.grammar.dto.request.GrammarScoreReqDTO;
import com.arch.raon.domain.grammar.entity.GrammarQuiz;
import com.arch.raon.domain.grammar.entity.GrammarScore;
import com.arch.raon.domain.grammar.repository.GrammarQuizRepository;
import com.arch.raon.domain.grammar.repository.GrammarScoreRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class GrammarServiceImpl implements GrammarService {

	private final GrammarQuizRepository grammarQuizRepository;
	private final GrammarScoreRepository grammarScoreRepository;

	@Override
	public List<GrammarQuiz> getQuizzes() {
		return grammarQuizRepository.random10();
	}


	@Transactional
	@Override
	public void saveQuizResult(GrammarScoreReqDTO grammarScoreReqDTO) {
		// // 1. member_id가 유효한지 확인
		// boolean isValidMember =

		//
		// // 2.
		final long TEST_MEMBER_ID = 6;

		GrammarScore grammarScoreEntity = GrammarScore
			.builder()
			.score(grammarScoreReqDTO.getScore())
			.play_time(grammarScoreReqDTO.getPlay_time())
			.member_id(TEST_MEMBER_ID) // TODO: 현재 member_id가 없어서 임의로 저장.
			.build();

		 grammarScoreRepository.save(grammarScoreEntity);
	}
}